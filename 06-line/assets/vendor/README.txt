Vendored browser libraries (no CDN, no build step — the site must run from file://)

gsap.min.js                 GSAP 3.15.1             https://gsap.com
ScrollTrigger.min.js        GSAP plugin 3.15.1      https://gsap.com/docs/v3/Plugins/ScrollTrigger/
DrawSVGPlugin.min.js        GSAP plugin 3.15.1      https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/
lenis.min.js                Lenis 1.3.27            https://github.com/darkroomengineering/lenis
LICENSE-lenis.txt           Lenis licence (MIT)

GSAP and its plugins are free for commercial use under the GSAP standard
licence since version 3.13 (April 2025): https://gsap.com/standard-license
DrawSVGPlugin used to require a paid Club membership and is now included in
the free release.

Each library is loaded as a plain UMD script from assets/js/line.js's page, so
the site keeps working when opened directly from disk with no server.
