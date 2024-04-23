const imageContainers = document.querySelectorAll('.image-container');

imageContainers.forEach(container => {
	const image = container.querySelector('img');
	const details = container.querySelector('.image-details');

	// 鼠标悬浮事件处理程序
	container.addEventListener('mouseover', () => {
		details.style.display = 'block';
	});

	// 鼠标离开事件处理程序
	container.addEventListener('mouseout', () => {
		details.style.display = 'none';
	});
});

const details = document.querySelectorAll('.imgdetails');
const imgs = document.querySelectorAll('.img');
details.forEach(detail => {
	const standfirst = detail.querySelector("#standfirst")
	// 鼠标悬浮事件处理程序
	detail.addEventListener('mouseover', () => {
		standfirst.style.opacity = '1';
		imgs.forEach(image => {
			image.style.filter = 'brightness(40%)';
		});
	});

	// 鼠标离开事件处理程序
	detail.addEventListener('mouseout', () => {
		standfirst.style.opacity = '0';
		imgs.forEach(image => {
			image.style.filter = 'brightness(100%)';
		});
	});

});

const newswrapper = document.querySelector(".newswrapper"),
	carousel = document.querySelector(".carousel"),
	images = document.querySelectorAll(".img"),
	buttons = document.querySelectorAll(".button")
let imageIndex = 1,
	intervalId;

const autoSlide = () => {
	intervalId = setInterval(() => setTimeout(slideImage(++imageIndex), 0), 3000);
};
autoSlide();
const slideImage = () => {
	imageIndex = imageIndex === images.length ? 0 : imageIndex < 0 ? images.length - 1 : imageIndex;
	carousel.style.transform = `translate(-${imageIndex * 100}%)`;
};
const updateClick = (e) => {
	clearInterval(intervalId);
	imageIndex += e.target.id === "next" ? 1 : -1;
	slideImage(imageIndex);
	autoSlide();
}
buttons.forEach((button) => button.addEventListener("click", updateClick));
newswrapper.addEventListener("mouseover", () => clearInterval(intervalId));
newswrapper.addEventListener("mouseleave", autoSlide);

//天气查询系统
function ajaxGet(url, params) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: url,
			type: 'GET',
			data: params,
			success: function(response) {
				resolve(response);
			},
			error: function(error) {
				reject(error);
			}
		});
	});
}

const key = 'eb4ab30361ef1585d7bdd45b376cecf4' //方法外定义key减少复用

async function getCity() {
	const params = {
		key: key, // 高德密钥
		address: $('#city').val()
	};
	let res;
	try {
		res = await ajaxGet('https://restapi.amap.com/v3/geocode/geo?parameters', params);
		console.log('Response:', res);
		return res.geocodes[0].adcode;
	} catch (error) {
		console.error('Error:', error);
		console.log('Response:', res);
		throw error;
	}
}

async function getWeather() {
	try {
		const adcode = await getCity();
		const params = {
			key: key,
			city: adcode,
			extensions: 'base'
		};
		var box = document.getElementById("box");
		box.style.opacity = "0";
		const res = await ajaxGet('https://restapi.amap.com/v3/weather/weatherInfo?parameters', params);
		const weather = res.lives[0];
		document.getElementById("tem").innerHTML = "温度：" + weather.temperature + "℃";
		document.getElementById("weather").innerHTML = "天气现象：" + weather.weather;
		document.getElementById("wea").innerHTML = "风向/风力：" + weather.winddirection + "/" + weather
			.windpower;
		document.getElementById("localcity").innerHTML = "当前城市：" + weather.city;
		document.getElementById("date").innerHTML = "更新时间：" + weather.reporttime;
		setTimeout(function() {
			box.style.opacity = "1";
		}, 100);
	} catch (error) {
		throw error;
	}
};

$('#city').val('淮安');
getWeather();