// Find the navigation list already in index.html.
const navigation = document.querySelector(".nav-links");

if (navigation) {
  // Create a keyboard-accessible menu button.
  const menuButton = document.createElement("button");
  menuButton.type = "button";
  menuButton.className = "button menu-toggle";
  menuButton.textContent = "Open menu";

  // Connect the button to the navigation list.
  navigation.id = "portfolio-navigation";
  menuButton.setAttribute("aria-controls", navigation.id);
  menuButton.setAttribute("aria-expanded", "false");
  navigation.before(menuButton);

  const narrowScreen = window.matchMedia("(max-width: 599px)");

  // Update the visible menu and its accessibility state.
  function setMenuOpen(open) {
    navigation.hidden = !open;
    navigation.style.display = open ? "" : "none";
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.textContent = open ? "Close menu" : "Open menu";
  }

  // Show the button on phones and all links on wider screens.
  function updateMenuLayout() {
    const buttonHadFocus = document.activeElement === menuButton;
    const focusWasInLinks = navigation.contains(document.activeElement);

    menuButton.hidden = !narrowScreen.matches;
    menuButton.style.display = narrowScreen.matches ? "inline-block" : "none";
    setMenuOpen(!narrowScreen.matches);

    // Preserve keyboard access when the layout changes.
    if (narrowScreen.matches && focusWasInLinks) {
      menuButton.focus();
    } else if (!narrowScreen.matches && buttonHadFocus) {
      navigation.querySelector("a").focus();
    }
  }

  // Native buttons support both Enter and Space.
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
  });

  // Escape closes the mobile menu and returns focus to its button.
  navigation.parentElement.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      narrowScreen.matches &&
      menuButton.getAttribute("aria-expanded") === "true"
    ) {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  narrowScreen.addEventListener("change", updateMenuLayout);
  updateMenuLayout();
}
