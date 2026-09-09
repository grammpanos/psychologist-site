/**
 * Μικρές διαδραστικές λειτουργίες του site:
 * μενού κινητού, ομαλή κύλιση και τόνιση του ενεργού συνδέσμου.
 */
(function () {
	'use strict';

	/* ---- Μενού για κινητά ---------------------------------------------- */
	var toggle = document.querySelector('[data-menu-toggle]');
	var panel  = document.querySelector('[data-menu-panel]');

	if (toggle && panel) {
		toggle.addEventListener('click', function () {
			var open = panel.classList.toggle('hidden') === false;
			toggle.setAttribute('aria-expanded', String(open));
			var icon = toggle.querySelector('.material-symbols-outlined');
			if (icon) { icon.textContent = open ? 'close' : 'menu'; }
		});

		// Κλείσιμο μόλις ο χρήστης διαλέξει προορισμό.
		panel.addEventListener('click', function (e) {
			if (e.target.closest('a')) {
				panel.classList.add('hidden');
				toggle.setAttribute('aria-expanded', 'false');
				var icon = toggle.querySelector('.material-symbols-outlined');
				if (icon) { icon.textContent = 'menu'; }
			}
		});
	}

	/* ---- Ποιο τμήμα βλέπει ο επισκέπτης; ------------------------------- */
	var links = Array.prototype.slice.call(
		document.querySelectorAll('header nav a[href^="#"], [data-menu-panel] a[href^="#"]')
	);
	var sections = links
		.map(function (a) { return document.querySelector(a.getAttribute('href')); })
		.filter(Boolean);

	if (sections.length && 'IntersectionObserver' in window) {
		var observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (!entry.isIntersecting) { return; }
				links.forEach(function (a) {
					var on = a.getAttribute('href') === '#' + entry.target.id;
					a.classList.toggle('text-text-heading', on);
					a.classList.toggle('font-semibold', on);
					if (on) { a.setAttribute('aria-current', 'true'); }
					else    { a.removeAttribute('aria-current'); }
				});
			});
		}, { rootMargin: '-45% 0px -50% 0px' });

		sections.forEach(function (s) { observer.observe(s); });
	}
})();
