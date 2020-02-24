$(document).ready(function() {
    $(".del").click(function(){
        const favorite = [];
        $.each($("input:checked"), function(){
            favorite.push($(this).val());
        });
        console.log("My deletion tasks are: " + favorite.join(", "));
    });
});

// module.exports = { variableName: "favorite" };
