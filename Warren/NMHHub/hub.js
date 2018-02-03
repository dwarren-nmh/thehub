var results = []; //the links that match the text
var catagories = [];
var current = [];
var students = [];
var employees = [];
var stu = false;
var emp = false;
var all = true;

/*
 This will run once the page has fully uploaded
 this will read all the links from links.js and assign them to their appropriate
 category (adults/students)
 Then it will assign event listeners to buttons so the view will change

 */
$(document).ready(function() {
  $("#results").css('background-color', '#111');

  //populate both students and employees arrays with correct links
  $.each(links, function(i, link) {
    if (link.audience === "students" || link.audience === "both") {
      students.push(link);
    }
    if (link.audience === "adults" || link.audience === "both") {
      employees.push(link);
    }
  });

  //push all
  $.each(links, function(i, link) {
    results.push(link);
  });

  //creates array of all the catagories
  $.each(links, function(i, link) {
    if (!catagories.includes(links[i].category)) {
      catagories.push(links[i].category);
    }
  });

  //create buttons for each catagory
  $.each(catagories, function(i, links) {
    $(".btn-group-vertical").append('<button type="button" class="btn btn-secondary" id="' + links + '">' + links + '</button>');
  });

  //makes catagory buttons clickable
  $(".btn-secondary").on("click", function() {
    //clear search Bar
    $("#search").val("");

    //style selected catagory button
    $(".btn-secondary").css('background-color', '#519dd0');
    $(this).css('background-color', '#111');

    var currentId = this.id;
    var matching = [];
    current = [];
    $("#results").children().remove(); //reset the element
    $.each(links, function(i, link) {
      if (link.category === currentId) {
        current.push(link);
      }
    });
    if (stu) {
      $.each(current, function(i, link) {
        if (link.audience === "students" || link.audience === "both") {
          matching.push(link);
        }
      });
    } else if (emp) {
      $.each(current, function(i, link) {
        if (link.audience === "adults" || link.audience === "both") {
          matching.push(link);
        }
      });
    } else if (all) {
      $.each(current, function(i, link) {
        matching.push(link);
      });
    }
    if (matching.length < 20 && matching.length > 0) {
      $("#results").css('background-color', '#005b94');
      //after all the matching elements are found, add them to the results div
      $.each(matching, function(i, link) {
        $("#results").append("<li><a href='" + link.href + "'>" + link.text + "</a></li>");
      });
    } else {
      $("#results").css('background-color', '#111');
    }
  });

  //student, all, employee buttons
  $(".btn-custom").on("click", function() {
    //change styling of correct button
    $(".btn-custom").css('background-color', '#005b94');
    $(this).css('background-color', '#519dd0');
    btnId = this.id;
    $("#results").children().remove(); //reset the element

    //set each variable to appropraite boolean value
    if (btnId === "students") {
      stu = true;
      emp = false;
      all = false;
    } else if (btnId === "employees") {
      emp = true;
      stu = false;
      all = false;
    } else if (btnId === "allBtn") {
      all = true;
      stu = false;
      emp = false;
    }

    //if something has been search, find the relevent links and only show those
    var relevent = [];
    var findText = $("#search").val(); //gets text from input

    if (current.length > 0) {
      //only display links that are in the "current" array (have the currently selected catagory)
      if (btnId === "students") {
        $.each(current, function(i, link) {
          if ((link.audience === "students" || link.audience === "both") && current[i].text.toLowerCase().indexOf(findText) >= 0) {
            //only push links for students or both
            relevent.push(link);
          }
        });
      } else if (btnId === "employees") {
        $.each(current, function(i, link) {
          if ((link.audience === "adults" || link.audience === "both") && current[i].text.toLowerCase().indexOf(findText) >= 0) {
            //only push links for students or both
            relevent.push(link);
          }
        });
      } else {
        //push all
        $.each(current, function(i, link) {
          if (current[i].text.toLowerCase().indexOf(findText) >= 0) {
            relevent.push(link);
          }
        });
      }
    } else {
      //code below

      if (btnId === "students") {
        $.each(links, function(i, link) {
          if ((link.audience === "students" || link.audience === "both") && links[i].text.toLowerCase().indexOf(findText) >= 0) {
            //only push links for students or both
            relevent.push(link);
          }
        });

      } else if (btnId === "employees") {
        $.each(links, function(i, link) {
          if ((link.audience === "adults" || link.audience === "both") && links[i].text.toLowerCase().indexOf(findText) >= 0) {
            //only push links for students or both
            relevent.push(link);
          }
        });
      } else {
        //push all
        $.each(links, function(i, link) {
          if (links[i].text.toLowerCase().indexOf(findText) >= 0) {
            relevent.push(link);
          }
        });
      }
    }
    //after all relevent links  are found, add them to the results div
    if (relevent.length < 20 && relevent.length > 0) {
      $("#results").css('background-color', '#005b94');
      $.each(relevent, function(i, link) {
        $("#results").append("<li><a href='" + link.href + "'>" + link.text + "</a></li>");
      });
    } else {
      $("#results").css('background-color', '#111');
    }

  });
});

//when typing a search, wait for keyup
//when the keyup event is fired it deletes the previous results, and starts looking for new results with each keypress
$("#search").keyup(function() {
  results = []; //reset the array
  $("#results").children().remove(); //reset the element
  var findText = $(this).val(); //gets text from input

  var currentMatch = [];

  if (current.length > 0) {
    //only search through current catagory links
    $.each(current, function(i, link) {
      //let tags = link.tags.split(",");
      console.log(tags);
      if (current[i].text.toLowerCase().indexOf(findText.toLowerCase()) >= 0) {
        currentMatch.push(link);
      }
    });

    $.each(currentMatch, function(i, link) {
      if (stu && (link.audience === "students" || link.audience === "both")) {
        results.push(link);
      } else if (emp && (link.audience === "adults" || link.audience === "both")) {
        results.push(link);
      } else if (all) {
        results.push(link);
      }
    });
  } else {
    //only searches through relevent links (aka students or employees)
    if (stu) {
      $.each(students, function(i, link) {
        //if the current link's text includes the find text, add it to the array
        if (students[i].text.toLowerCase().indexOf(findText) >= 0) {
          results.push(link);
        }
      });
    } else if (emp) {
      $.each(employees, function(i, link) {
        //if the current link's text includes the find text, add it to the array
        if (employees[i].text.toLowerCase().indexOf(findText) >= 0) {
          results.push(link);
        }
      });
    } else if (all) {
      //loops through each element in links array
      $.each(links, function(i, link) {
        //if the current link's text includes the find text, add it to the array
        if (links[i].text.toLowerCase().indexOf(findText) >= 0) {
          results.push(link);
        }
      });
    }
  }

  if (results.length < 20 && results.length > 0) {
    $("#results").css('background-color', '#005b94');
    //after all the matching elements are found, add them to the results div
    $.each(results, function(i, link) {
      $("#results").append("<li><a href='" + link.href + "'>" + link.text + "</a></li>");
    });
  } else {
    $("#results").css('background-color', '#111');
  }
});
