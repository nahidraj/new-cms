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

  // full page loader js
  $(".fullpage_loader").fadeOut("slow", function () {
    $(this).remove();
  });

  // component loader js
  $(".component_loader").fadeOut("slow", function () {
    $(this).remove();
  });

  // update date and time
  function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return hours + ':' + minutes + ':' + seconds + ' ' + ampm;
  }

  function formatDate(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();
    return day + ' ' + monthNames[monthIndex] + ', ' + year;
  }

  function updateDateTime() {
    const now = new Date();
    const timeString = formatAMPM(now);
    const dateString = formatDate(now);
    document.getElementById('currentDateTime').innerText = timeString + ' - ' + dateString;
  }

  updateDateTime();
  setInterval(updateDateTime, 1000); // Update every second

  // dropdown menu js
  $(document).ready(function () {
    // Toggle dropdown menu on button click
    $(".dropdown_menu").on("click", function (e) {
      e.stopPropagation(); // Prevent the click event from bubbling up to the document
      var $menu = $(this).next(".dropdown_menu_info");
      $(".dropdown_menu_info").not($menu).removeClass("control_dropdown_menu");
      $menu.toggleClass("control_dropdown_menu");
    });

    // Close dropdown menu when clicking outside of it
    $(document).on("click", function (e) {
      if (!$(e.target).closest('.dropdown_menu_info').length) {
        $(".dropdown_menu_info").removeClass("control_dropdown_menu");
      }
    });

    // Prevent dropdown menu from closing when clicking inside it
    $(".dropdown_menu_info").on("click", function (e) {
      e.stopPropagation(); // Prevent the click event from bubbling up to the document
    });
  });

  // sidebar collapsed menu js
  // Check the saved state in localStorage and apply it
  if (localStorage.getItem("sidebarState") === "collapsed") {
    $("body").addClass("collapsed_sidebar");
  }

  // Toggle sidebar state and save it in localStorage
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

  // chosen js
  $(".chosen").chosen()
});