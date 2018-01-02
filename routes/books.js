var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;

/* GET Show all books */
router.get('/', function(req, res, next) {
  var data = {
  	"Data" : ""
  };
  var db = req.db;
  db.collection('books').find().toArray(function (err, items) {
        if(items.length != 0){
            data["error"] = 0;
            data["Books"] = items;
            res.json(data);
        }else{
            data["error"] = 1;
            data["Books"] = 'No books Found..';
            res.json(data);
        }
    });
});

/* GET Show book details */
router.get('/:id', function(req,res){
    var data = {
        "Data": ""
    };
    var id = req.params.id;
    var db = req.db;
    db.collection('books').findOne({"_id": new ObjectId(id)}, function(err,items){
        if(items.length != 0){
            data["error"] = 0;
            data["Books"] = items;
            res.json(data);
        } else {
            data["error"] = 1;
            data["Books"] = "No books found..";
            res.json(data);
        }
    });
});

/* POST Add a new book */
router.post('/create', function(req,res){
	var db = req.db;
	var Bookname = req.body.bookname;
	var Bookdate = req.body.bookdate;
	//var Bookprice = req.body.bookprice;
	var BookDescription = req.body.bookdescription;
	var BookCover = req.body.bookcover;
	var BookGender = req.body.bookgender;
	var BookAuthor = req.body.bookauthor;
    var Bookeditor = req.body.bookeditor;
	var data = {
		"error":1,
		"Books": ""
	};

	
	if(!!Bookname && !!Bookdate && !!Bookeditor && !!BookDescription 
		&& !!BookCover && !!BookGender && !!BookAuthor && !!Bookeditor){
        db.collection('books').insert({bookname:Bookname , 
        	bookdate: Bookdate,
        	bookdescription:BookDescription, bookcover:BookCover, bookgender: BookGender,
        	bookauthor:BookAuthor, bookeditor:Bookeditor}, function(err, result) {
            if(!!err){
                data["Books"] = "Error Adding data";
            }else{
                data["error"] = 0;
                data["Books"] = "Book Added Successfully";
            }
            res.json(data);
		});
	}else{
		data["Books"] = "Please provide all required data (i.e : Bookname, Authorname, Price)";
        res.json(data);
	}
});		


/*PUT Update book details */
router.put('/update/:bookId', function(req, res){
    var id = req.params.bookId;
    var Bookname = req.body.bookname;
    var Bookdate = req.body.bookdate;
    var Bookprice = req.body.bookprice;
    var BookDescription = req.body.bookdescription;
    var BookCover = req.body.bookcover;
    var BookGender = req.body.bookgender;
    var BookAuthor = req.body.bookauthor;
    var Bookeditor = req.body.bookeditor;;

    var db = req.db;
    var data = {
        "error" : 1,
        "Books": ""
    };
    if(!!Bookname && !!Bookdate && !!Bookeditor && !!Bookprice && !!BookDescription 
        && !!BookCover && !!BookGender && !!BookAuthor && !!Bookeditor){
        db.collection('books').update({"_id": new ObjectId(id)}, 
            {$set:{bookname:Bookname, bookdate: Bookdate, bookeditor:Bookeditor, bookprice:Bookprice,bookdescription:BookDescription, 
                bookcover:BookCover, bookgender:BookGender,bookauthor:BookAuthor,bookeditor:Bookeditor}}, function(err, result) {
            if(!!err){
                data["Books"] = "Error Updating data";
                console.log("second");
            }else{
                data["error"] = 0;
                data["Books"] = "Updated Book Successfully";
            }
            res.json(data);
            console.log(data);
        });
    }else{
        data["Books"] = "Please provide all required data ";
        res.json(data);
    }
});


/*DELETE Delete a book */
router.delete('/delete/:bookId',function(req,res){
    var Id = req.params.bookId;
    var db = req.db;
    var data = {
        "error":1,
        "Books":""
    };
    if(!!Id){
        db.collection('books').remove({"_id": new ObjectId(Id)}, function(err, result) {
            if(!!err){
                data["Books"] = "Error deleting data";
            }else{
                data["error"] = 0;
                data["Books"] = "Delete Book Successfully";
            }
            res.json(data);
        });
    }else{
        data["Books"] = "Please provide all required data";
        res.json(data);
    }
});


/* GET Search a book */
router.get('/search/:searchTerm', function(req, res){
    var searchTerm = req.params.searchTerm;
    var db = req.db;
    var data = {
        "error" : 1,
        "Books" : ""
    };
    if(!!searchTerm){
        db.collection("books").find({ "bookname" : searchTerm}), function(err, result){
            if(!!err){
                data["Books"] = "No books called :" + searchTerm + "has been found";
            }else{
                data["errors"] = 0;
                data["Books"] = items;
            }
            res.json(data);
        }
    }
    else{
        data["Books"] = "Please provide all required data";
        res.json(data);
    }
})

module.exports = router;