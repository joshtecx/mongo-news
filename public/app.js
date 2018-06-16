$(document).on("click", "#scraper", function(){
    console.log("click");
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function(data){
        $.ajax({
            method: "GET",
            url: "/"
        })
        .then(function(data){
            location.reload();
        })

    });
});

$(document).on("click", ".submit", function(event){
    event.preventDefault();
    console.log("click");
    const thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            body: $(`#Note${id}`).val()
        }
    });
    $(".noteArea").val("");
});













// Get articles in json form
// $.getJSON("/articles", function(data){
//     for(let i = 0; i < data.length; i++){
//         $("#articles").append(`<p data-id=${data[i]._id} <br /> ${data[i].link} </p>`);
//     }
// });

// $(document).on("click", "p", function(){
//     $("#notes").empty();
//     const thisId = $(this).attr("data-id");

//     $.ajax({
//         method: "GET",
//         url: "/articles/" + thisId
//     })
//         .then(function(data){
//             console.log(data);
//             $("#notes").append(`<h2> ${data.title} </h2>`);

//             $("#notes").append(`<input id="titleinput" name="title" >`);

//             $("#notes").append(`<textarea id="bodyinput" name="body"></textarea>`);

//             $("#notes").append(`<button data-id=${data._id} id="savenote">Save Note</button>`);

//             if(data.note){
//                 $("#titleinput").val(data.note.title);
//                 $("#bodyinput").val(data.note.body);
//             }

//         });
// });

// $(document).on("click", "#savenote", function(){
//     const thisId = $(this).attr("data-id");

//     $.ajax({
//         method: "POST",
//         url: "/articles/"+ thisId,
//         data: {
//             title: $("#titleinput").val(),
//             body: $("#titleinput").val()
//         }
//     })
//         .then(function(data){
//             console.log(data);
//             $("#notes").empty();
//         });
//         $("#titleinput").val("");
//         $("#titleinput").val("");
// });