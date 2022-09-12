const redirect = {
	"fonts\\.gstatic\\.com(.*)": "test.samtaen.nl$1",
	"(\\w*)\\.?wikipedia.org(.*)": "wikiless.org$2?lang=$1",
	"twitter\\.com(.*)": "nitter.net$1",
	"youtube\\.com(.*)": "yewtu.be$1",
	"reddit\\.com(.*)": "libreddit.nl$1",
	"(i\\.)?imgur.com(.*)": "i.bcow.xyz$2",
	"instagram.com(.*)": "bibliogram.art$1",
	"youtube.com(.*)": "yewtu.be$1",
	"youtu.be/(.*)": "yewtu.be/watch?v=$1",
	".*medium.com(.*)": "scribe.rip$1",
};

chrome.webRequest.onBeforeRequest.addListener(
	({ url: urlString, ...data }) => {
		const url = new URL(urlString);
		const match = Object.keys(redirect).find((name) =>
			new RegExp(name).test(url.hostname),
		);

		if (match) {
			const regex = new RegExp(match).exec(url.href);
			if (!regex) return;
			const redirectUrl = regex.reduce((prev, curr, i) => {
				return prev.replace(`\$${i}`, curr);
			}, "https://" + redirect[match]);
			return { redirectUrl };
		}
	},
	{ urls: ["<all_urls>"] },
	["blocking"],
);
