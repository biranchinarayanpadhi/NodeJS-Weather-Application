// JavaScript source code
$(document).ready(function () {

    $(".plusicon").click(function () {
        $(".form-control").toggleClass("display");
    });

    $("input").focus(function () {
        $("input").css("border", "3px red Solid");

    });

    $("input").focusout(function () {
        $("input").css({ "border": "" });
    });

    $("input").keypress(function (e) {

        if (e.which == 13) {
            var value = $("input").val();
            if (value.length > 0) {
                var element = "<div class='row items'><i class='fa fa-trash trash'></i><span class='value'>" + value + "</span></div>";
                $(".container").append(element);
            }
        }
    });

    $("div").on("mouseenter", ".items", function () {
        $(".trash", this).css("display", "inline");
        $(".trash").click(function () { $(this).closest(".items").remove(); });
    });

    $("div").on("click", ".items", function () { console.log("kalia"); $(this).toggleClass("done"); });

    $("div").on("mouseleave", ".items", function () { $(".trash").css("display", "none"); });
});
