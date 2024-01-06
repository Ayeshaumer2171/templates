const textarea = document.querySelector('.chatbox-message-input');
const chatboxForm = document.querySelector('.chatbox-message-form');

textarea.addEventListener('input', function () {
  let line = textarea.value.split('\n').length;

  if (textarea.rows < 6 || line < 6) {
    textarea.rows = line;
  }

  if (textarea.rows > 1) {
    chatboxForm.style.alignItems = 'flex-end';
  } else {
    chatboxForm.style.alignItems = 'center';
  }
});

const chatboxToggle = document.querySelector('.chatbox-toggle');
const chatboxMessage = document.querySelector('.chatbox-message-wrapper');

chatboxToggle.addEventListener('click', function () {
  chatboxMessage.classList.toggle('show');
});

const dropdownToggle = document.querySelector('.chatbox-message-dropdown-toggle');
const dropdownMenu = document.querySelector('.chatbox-message-dropdown-menu');

dropdownToggle.addEventListener('click', function () {
  dropdownMenu.classList.toggle('show');
});

document.addEventListener('click', function (e) {
  if (!e.target.matches('.chatbox-message-dropdown, .chatbox-message-dropdown *')) {
    dropdownMenu.classList.remove('show');
  }
});

const chatboxMessageWrapper = document.querySelector('.chatbox-message-content');
const chatboxNoMessage = document.querySelector('.chatbox-message-no-message');

chatboxForm.addEventListener('submit', function (e) {
  e.preventDefault();

  if (isValid(textarea.value)) {
    writeMessage();
    setTimeout(autoReply, 1000);
  }
});

function addZero(num) {
  return num < 10 ? '0' + num : num;
}

function writeMessage() {
  const today = new Date();
  let message = `
    <div class="chatbox-message-item sent">
      <span class="chatbox-message-item-text">
        ${textarea.value.trim().replace(/\n/g, '<br>\n')}
      </span>
      <span class="chatbox-message-item-time">${addZero(
        today.getHours()
      )}:${addZero(today.getMinutes())}</span>
    </div>
  `;
  chatboxMessageWrapper.insertAdjacentHTML('beforeend', message);
  chatboxForm.style.alignItems = 'center';
  textarea.rows = 1;
  textarea.focus();
  textarea.value = '';
  chatboxNoMessage.style.display = 'none';
  scrollBottom();
}

function autoReply() {
	const today = new Date();
	const userMessage = textarea.value.trim().toLowerCase();
	let message = generateResponse(userMessage);
  
	function generateResponse(userMessage) {
	  const questions = {
		greeting: ['Hi there!', 'Hello!', 'Hey! How can I assist you?'],
		weather: ['The weather is sunny today.', 'It\'s raining outside.'],
		inquiry: [
		  'How can I help you?',
		  'What can I assist you with?',
		  'Do you have any specific questions?',
		],
		// Add more questions and their corresponding responses
	  };
  
	  const defaultResponse =
		"I'm sorry, I didn't understand. Could you please explain your question?";
  
	  // Check if the user's message matches any question
	  for (const key in questions) {
		if (
		  questions.hasOwnProperty(key) &&
		  userMessage.includes(key.toLowerCase())
		) {
		  const responses = questions[key];
		  const randomResponse =
			responses[Math.floor(Math.random() * responses.length)];
		  return randomResponse;
		}
	  }
  
	  // If no matching question is found, provide a default response
	  return defaultResponse;
	}
  
	const chatboxMessageItem = `
	  <div class="chatbox-message-item received">
		<span class="chatbox-message-item-text">${message}</span>
		<span class="chatbox-message-item-time">${addZero(
		  today.getHours()
		)}:${addZero(today.getMinutes())}</span>
	  </div>
	`;
	chatboxMessageWrapper.insertAdjacentHTML('beforeend', chatboxMessageItem);
	scrollBottom();
  }
  
function scrollBottom() {
  chatboxMessageWrapper.scrollTo(0, chatboxMessageWrapper.scrollHeight);
}

function isValid(value) {
  let text = value.replace(/\n/g, '');
  text = text.replace(/\s/g, '');

  return text.length > 0;
}
