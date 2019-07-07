var express = require('express');
var app = express();
const port = 3000;

//Middleware for parse req.body into JSON in express server
app.use(express.json());
//End

//Package for validation
const Joi = require('@hapi/joi');
const schema = Joi.object().keys({
    title: Joi.string().min(3).max(40).required()
})
//End

var courses = [
    {
        id: 1,
        title: 'Angular'
    },
    {
        id: 2,
        title: 'React'
    }
]

//get all api (GET)
app.get('/courses', (req, res) => {
    res.send(courses);
});

//get by id (GET)
app.get('/courses/:id', (req, res) => {
    const id = req.params.id;
    const course = courses.find(a=>a.id === parseInt(id));
    if(course){
        return res.send(course);
    }
    else{
        return res.status(400).send("Course not found against this ID.");
    }
    //res.send(courses);
});

//Add (POST)
app.post('/courses', (req, res) => {
    const courseTitle = req.body.title;
    const makeId = courses.length + 1;
    const courseObj = {id: makeId, title: courseTitle};
    const result = validate(courseObj);
    if(!result.error){
        courses.push(courseObj);
        res.send(courseObj);
    }
    else{
        res.status(400).send(result.error.details[0].message);
    }
    
});

//Update (PUT)
app.put('/courses/:id', (req, res) => {
    const id = req.params.id;
    const course = courses.find(a=>a.id === parseInt(id));
    if(course){
        //Update
        const courseTitle = req.body.title;
        const result = validate({title: courseTitle});
        if(!result.error){
            course.title = courseTitle;
            res.send(course);
        }
        else{
            res.status(400).send(result.error.details[0].message);
        }
        
    }
    else{
        return res.status(400).send("Course not found against this ID.");
    }
})

//Delete (Delete)
app.delete('/courses/:id', (req, res) => {
    const id = req.params.id;
    const course = courses.find(a=>a.id === parseInt(id));
    if(course){
        //Delete
        const indexCourse = courses.indexOf(course);
        courses.splice(indexCourse, 1);
        return res.send(course);
    }
    else{
        return res.status(400).send("Course not found against this ID.");
    }
})

//ValidationMethod
const validate = (data) => {
    const result = Joi.validate(data, schema);
    return result;
}
//End

//New work with mongoDB
const db = require('./db');
const Book = db.Book;

//Find all books
app.get('/books', async (req, res) => {
    const books = await Book.find();
    res.send(books);
})
//End
//Find by id
app.get('/books/:id', async (req, res) => {
    //console.log(req.param.id);
    const book = await Book.findById(req.params.id);
    res.send(book);
})
//End
//Create Book
app.post('/books', async (req, res)=>{
    //Book.Save(req.body);
    const book = await Book.create(req.body);
    res.send(book);
})
//End
//Delete Book
app.delete('/books/:id', async(req, res)=>{
    const book = await Book.deleteOne({_id: req.params.id});
    res.send(book);
});
//End
//Update Book//
app.put('/books/:id', async(req, res)=>{
    const book = await Book.updateOne(req.body);
    res.send(book);
});
//End
//End


app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})