const express = require('express');
const Joi = require('@hapi/joi');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'Data Structures'},
    { id: 2, name: 'Design Systems, and Society'},
    { id: 3, name: 'Calculus'}
]

app.get('/', (req, res) => {
    res.send('Hello World');
});

// endpoints that return data on GET, essentially a RESTful API
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// Joi helps validate user post requests and returns appropriate error messages
app.post('/api/courses', (req, res) => {
    // schema using Joi helps us validate if req body meets requirements
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    // validate course 
    const { error } = validateCourse(req.body);
    if (error) {
        return res.status(400).send(result.error.details[0].message);
    }
    // Create new course
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course); // add course to array
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // Look up the course with given id parameter
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id)); // Find inside courses arr if there is object id that matches request id
    if(!course) {
        return res.status(404).send('The course with the given ID was not found.'); // 404 object not found
    }
    // Validate course using object destructuring
    const { error } = validateCourse(req.body); // equivalent to getting result.error

    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    // Update course
    course.name = req.body.name;
    // Return the updated course
    res.send(course); 

});

function validateCourse(course) {
    // Validate 
    // If invalid, return 400 - Bad request
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course);
}

// /api/courses/1
// endpoint of a single course, parameter is :id
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) {
        return res.status(404).send('The course with the given ID was not found.'); // 404 object not found
    }
    res.send(course);
});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});

app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    // If it doesn't exist, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id)); // Find inside courses arr if there is object id that matches request id
    if(!course) return res.status(404).send('The course with the given ID was not found.'); // 404 object not found

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1); // at index, remove 1 item

    // Return the same course
    res.send(course);
});

// PORT - dynamically get port number 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));