

var results = [];

function showResults(){
  $.each(results, function(i, link){
    console.log(link.text);
    $("#results").append("<ul>"+link.text+"</ul>");
  });
}

function test(){
  $.each(links,function(i, link){
    console.log(link.text);
    results.push(link);
  })
}
