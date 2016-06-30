// add your code here
$(document).ready(function(){

    $('#content').on('click', 'input.submit-btn' ,function () {

       var skip= $(this).attr('data-value');
       var urlFull = window.location.href,
            urlPath = "?skip=" +  skip;

        $.ajax({
            'type': 'GET',
            'url': urlFull + urlPath,
            'cache': false,
            'success': function(data){
                var dataHTML =  $('.post' , data);
                var dataButton = $('.submit-btn',data);
                //console.log("Data---",dataHTML);
                $('.submit-btn').remove();
                $("#content").append(dataHTML);
                $("#content").append(dataButton);
            }

        })

    });
});