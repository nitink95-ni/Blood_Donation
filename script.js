
    // Function to show a section and hide others
    function showSection(sectionId) {
      // Get all content sections
      const sections = document.querySelectorAll('.content-section');
      
      // Loop through each section
      sections.forEach(section => {
        // If the section's ID matches the clicked link, show it
        if (section.id === sectionId) {
          section.classList.add('active');
        } else {
          section.classList.remove('active');
        }
      });
    }

    // Function to scroll to top
    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }


    const monthYearElement = document.getElementById("month-year");
    const calendarDatesElement = document.getElementById("calendar-dates");
    const prevMonthButton = document.getElementById("prev-month");
    const nextMonthButton = document.getElementById("next-month");
    const selectedDateElement = document.getElementById("selected-date");
    const timeSlotsElement = document.getElementById("time-slots");

    let selectedDate = null;
    let selectedTime = null;
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    // Time Slots Array
    const timeSlots = ["09:00", "09:50", "10:40", "13:00", "13:50", "14:40", "15:30", "16:20", "17:10"];

    // Generate Calendar
    function generateCalendar() {
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
      const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const today = new Date();

      monthYearElement.textContent = `${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`;
      calendarDatesElement.innerHTML = "";

      for (let i = 0; i < firstDayOfMonth; i++) {
        calendarDatesElement.appendChild(document.createElement("div"));
      }

      for (let i = 1; i <= lastDateOfMonth; i++) {
        const dateCell = document.createElement("div");
        dateCell.classList.add("date");
        dateCell.textContent = i;

        if (i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
          dateCell.classList.add("selected");
        }

        dateCell.addEventListener("click", () => {
          selectedDate = new Date(currentYear, currentMonth, i);
          selectedDateElement.textContent = `Selected Date: ${selectedDate.toLocaleDateString()}`;
          document.querySelectorAll(".date").forEach(cell => cell.classList.remove("selected"));
          dateCell.classList.add("selected");
        });

        calendarDatesElement.appendChild(dateCell);
      }
    }

    // Generate Time Slots
    function generateTimeSlots() {
      timeSlotsElement.innerHTML = "";

      timeSlots.forEach(time => {
        const timeSlotElement = document.createElement("div");
        timeSlotElement.classList.add("time-slot");
        timeSlotElement.textContent = time;

        timeSlotElement.addEventListener("click", () => {
          selectedTime = time;
          document.querySelectorAll(".time-slot").forEach(slot => slot.classList.remove("selected"));
          timeSlotElement.classList.add("selected");
        });

        timeSlotsElement.appendChild(timeSlotElement);
      });
    }

    // Navigation
    prevMonthButton.addEventListener("click", () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      generateCalendar();
    });

    nextMonthButton.addEventListener("click", () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      generateCalendar();
    });

    // Initialize
    generateCalendar();
    generateTimeSlots();

