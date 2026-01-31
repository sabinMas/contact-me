//import express module
import express from 'express';

//creating an instance of express
const app =express();

// define PORT number
const PORT= 3000;

app.use(express.static('public'));

//define default route connected to sendfile instead of just send
app.get('/', (req,res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);

});

app.listen(PORT,() => {
    console.log(`Server is running at http://localhost:${PORT}`);
});


