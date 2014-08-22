'use strict';

var gtfsFix = require('chatt-gtfs-cleanup'),
  fs = require('fs'),
  _ = require('lodash'),
  files = ['routes.txt','shapes.txt','trips.txt'];

function inputDirHasFiles(input) {
  var dirFiles = fs.readdirSync(input);
  return dirFiles.length !== _.intersection(dirFiles, files).length;
}

$('#clean_gtfs').on('click', function() {

  var input = $('#select_input_directory').val(),
      output = $('#select_output_directory').val();
  try {
    if (!inputDirHasFiles(input)) {
      throw new Error('directory does not contain either routes.txt, shapes.txt, or trips.txt');
    }
    gtfsFix(input, output);
  } catch(err) {
    $('.error').text(err.message);
    $('.error').fadeIn();
  }

  $('.error').fadeOut();
});
