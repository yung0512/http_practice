$(document).ready(function(){
    $('#listall').click((event)=>{
        event.preventDefault();
        $("#list").empty();
        $.get('./students',(data)=>{
            const students = data;
            for(stu in students){
                $('#list').append(`<li>${stu}:${students[stu]}</li>`)
            }
        })
    })
    $('#searchBtn').click((event)=>{
        event.preventDefault();
        $("#studentFind").empty();
        $.get(`./students/${$('#search').val()}`
             ,(data)=>{
            $('#studentFind').append(`<p>${data}</p>`)
        })
    })
    $('#newBtn').click((event)=>{
        event.preventDefault();
        $.ajax({
            url: './students/new',
            type: 'PUT',
            data:{
                id:`${$('#newid').val()}`,
                name:`${$('#newname').val()}`               
            },
            success: function(result) {
                $('#newid').val('');
                $('#newname').val('');
                console.log("put success")// Do something with the result
            }
        })
    })
    $('#deleteBtn').click((event)=>{
        event.preventDefault();
        $.ajax({
            url: `./students/${$('#deleteId').val()}`,
            type: 'DELETE',
            success: function(result) {
                $('#deleteId').val('');
                console.log("response delete success")// Do something with the result
            }
        })
    })
});
/*************************************
 * create : PUT        update a part of resource:PATCH
 * update : POST
 * read   : GET
 * delete : DELETE
***************************************/