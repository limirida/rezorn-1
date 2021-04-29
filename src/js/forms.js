class leadForm {

	constructor({ selector, callback }) {
		this.selector = selector ? selector : '.lead-form';
		this.callback = callback ? callback : (m) => { alert(m); };

		this.setFormListener();
	}

	formListener(e) {
		e.preventDefault();

		sendToTelegram(forms.formToMessage(e.currentTarget));
		forms.sendForm(e.currentTarget);
	}

	setFormListener() {
		Array.from(document.querySelectorAll(this.selector)).forEach(form => {
			form.removeEventListener('submit', this.formListener);
			form.addEventListener('submit', this.formListener);
		});
	}

	showLoader(form) {
		const loader = document.createElement('div');
		loader.classList.add('lds-dual-ring');

		form.querySelector('button[type=submit]').prepend(loader);
	}

	hideLoader(form) {
		const ring = form.querySelector('.lds-dual-ring');
		if (ring)
			ring.remove();
	}

	sendForm(form) {
		const formData = new FormData(form);

		this.showLoader(form);

		fetch('/php/callback.php', {
			method: 'POST',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams(formData)
		}).then(resp => {
			resp.text().then(note => {

				this.hideLoader(form);

				if (note == 'ok' && form.dataset.sendok) {
					eval(form.dataset.sendok);
				} else if (form.dataset.senderror) {
					eval(form.dataset.senderror);
				} else
					this.callback(note);

				grecaptcha.customReset();
			});
		});
	}

	formToMessage(form) {
		const formData = new FormData(form);
		const formKeys = formData.keys();
		let message = 'Request from site:\n';

		for (let field of formKeys) {
			if (field !== 'recaptcha_response') {
				message += field + ': ' + formData.get(field) + '\n';
			}
		}

		return message;
	}
}

// Singleton
var forms = null;

document.addEventListener('DOMContentLoaded', () => {
	if (!forms) {
		forms = new leadForm({
			callback: function(note) {
				if (note == 'ok') {
					modal.open('#modal-thanks-node');
				} else {
					modal.open('#modal-error-node');
				}
			}
		});
	}
});



