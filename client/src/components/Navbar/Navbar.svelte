<nav>
        <div class="underline"></div>
        <div class="underline"></div>
        <div class="underline"></div>
        <a onClick="ul(0)">Home</a><a onClick="ul(1)">Videos</a><a onClick="ul(2)">Playlists</a><a
            onClick="ul(3)">Community</a><a onClick="ul(4)">Channels</a><a onClick="ul(5)">About</a>
    </nav>

    <script>
        function ul(index) {
	console.log('click!' + index)
	
	var underlines = document.querySelectorAll(".underline");

	for (var i = 0; i < underlines.length; i++) {
		underlines[i].style.transform = 'translate3d(' + index * 100 + '%,0,0)';
	}
}
    </script>