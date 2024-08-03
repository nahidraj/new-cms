$(function () {
  "use strict";

  // Fixed menu js start
  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll < 245) {
      $("#sticky-header").removeClass("sticky-menu");
      $("#header-fixed-height").removeClass("active-height");
    } else {
      $("#sticky-header").addClass("sticky-menu");
      $("#header-fixed-height").addClass("active-height");
    }
  });

  // sidebar collapsed menu js
  // Check the saved state in localStorage and apply it
  if (localStorage.getItem("sidebarState") === "collapsed") {
    $("body").addClass("collapsed_sidebar");
  }

  // Toggle sidebar state and save it in localStorage
// Check the saved state in localStorage and apply it
if (localStorage.getItem("sidebarState") === "collapsed") {
  $("body").addClass("collapsed_sidebar");
}

// Toggle sidebar state and save it in localStorage
$(".sidebar_control_btn, .close_mobile_sidebar").on("click", function () {
  $("body").toggleClass("collapsed_sidebar");
  if ($("body").hasClass("collapsed_sidebar")) {
    localStorage.setItem("sidebarState", "collapsed");
  } else {
    localStorage.removeItem("sidebarState");
  }
});



  // Initialize tooltips
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl, {
    trigger: 'hover'
  }));



  // back to top js
  var btn = $(".scroll-to-top");

  $(window).scroll(function () {
    btn.toggleClass("show", $(window).scrollTop() > 300);
  });

  btn.click(function (e) {
    e.preventDefault();
    if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
      $("html").animate({
          scrollTop: 0,
        },
        1000
      );
    } else {
      $("html, body").animate({
          scrollTop: 0,
        },
        0
      );
    }
  });

  // mobilel menu js

  $(".mobile-topbar .bars").on("click", function () {
    $(".mobile-menu-overlay,.mobile-menu-main").addClass("active");
    return false;
  });

  $(".close-mobile-menu,.mobile-menu-overlay").on("click", function () {
    $(".mobile-menu-overlay,.mobile-menu-main").removeClass("active");
  });

  $(document).ready(function () {
    // Hide all sub-menus initially
    $(".menu_item ul").hide();

    // Function to handle menu clicks
    $(".menu_item > a").on("click", function (e) {
      e.preventDefault();

      // Close all sibling menus
      $(this).parent().siblings().find("ul").slideUp("100");
      $(this).parent().siblings().find(".right").removeClass("fa-caret-up").addClass("fa-caret-down");

      // Toggle the clicked menu
      $(this).siblings("ul").slideToggle("100");

      // Toggle caret icon
      $(this).find(".right").toggleClass("fa-caret-up fa-caret-down");
    });

    // Function to handle nested menu clicks
    $(".sub_menu a").on("click", function (e) {
      e.stopPropagation(); // Prevent the click event from bubbling up to parent menus
      $(this).siblings("ul").slideToggle("100");
    });
  });


});