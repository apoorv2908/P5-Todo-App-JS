function openPopup() {
    document.getElementById('popupContainer').style.display = 'block';
  }

  function closePopup() {
    document.getElementById('popupContainer').style.display = 'none';
  }
  document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();  
  var name = document.getElementById('addinput').value;
    if (name) {
      closePopup();
    } else {
      alert('Please fill in all the fields.');
    }
  });

  var cardCount = 0;

    function addCard() {

      cardCount++;

      var container = document.querySelector('.container');

      var card = document.createElement('div');
      card.classList.add('card');
      var name = document.getElementById('addinput').value;
      var title = document.createElement('h2');

      title.style.color = "black"
      title.style.textAlign = "center"

      title.textContent = name;

      var form = document.createElement('form');

      var cancelButton = document.createElement('button');
      cancelButton.type = 'button';
      cancelButton.textContent = 'Cancel';
      cancelButton.addEventListener('click', function() {
        container.removeChild(card);
      });

      var submitButton = document.createElement('button');
      submitButton.textContent = "Add Tasks"
      submitButton.addEventListener('click', openPopup)

      form.appendChild(submitButton);
      form.appendChild(cancelButton);

      card.appendChild(title);
      card.appendChild(form);
      container.appendChild(card);

    }

   