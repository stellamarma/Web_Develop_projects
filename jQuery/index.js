
$("h1").addClass("big-title margin-50");

$("h1").text("hehehe");

$("button").html("<em>lalalal</em>");

$("a").attr("href","https://gr.pinterest.com/");

$("h1").click(function(){

    $("h1").css("color","blue");

});
$("button").click(function(){

    $("h1").css("color","red");
    $("h1").hide();
    $("h1").delay("slow").fadeIn();//slideUp,slideDown,slideToggle for the menu

});
$(document).keydown(function(event){
    $("h1").text(event.key);


});
$("h1").on("mouseover",function(){

    $("h1").css("color","purple");
});