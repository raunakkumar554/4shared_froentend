$(document).ready(function() {
    $('#uploadForm').on('submit', function(e) {
        e.preventDefault();
        
        var formData = new FormData();
        formData.append('file', $('#fileInput')[0].files[0]);
        var username = $('#usernameInput').val(); // Get username

        $.ajax({
            url: `https://foursharedapp-backend.onrender.com/upload?username=${username}`,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                $('#uploadFeedback').html('<div class="alert alert-success">' + response + '</div>');
            },
            error: function(xhr, status, error) {
                $('#uploadFeedback').html('<div class="alert alert-danger">Error uploading file: ' + xhr.responseText + '</div>');
            }
        });
    });
    
    $('#searchForm').on('submit', function(e) {
        e.preventDefault();
        
        var query = $('#queryInput').val();
        var type = $('#typeInput').val();
        var user = $('#userInput').val();
        
        $.ajax({
            url: 'https://foursharedapp-backend.onrender.com/search',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ query: query, type: type, user: user }),
            success: function(response) {
                $('#resultsList').empty();
                response.forEach(function(file) {
                    $('#resultsList').append('<li class="list-group-item">' + file + ' <a href="https://foursharedapp-backend.onrender.com/download?fileName=' + file + '" class="btn btn-sm btn-primary float-right">Download</a></li>');
                });
            },
            error: function(xhr, status, error) {
                $('#searchFeedback').html('<div class="alert alert-danger">Error searching files: ' + xhr.responseText + '</div>');
            }
        });
    });
});
