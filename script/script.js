(function(window) {
    window.document.addEventListener('DOMContentLoaded', function(event) {
        var thingsAboutMe = [
            'political junkie',
            'amateur comedian',
            'dog father',
            'occasional runner',
            'crime scene investigator',
            'still likes The Walking Dead',
            'erstwhile New Yorker',
            'video game enthusiast',
            'brown sugar pop tart defender',
            'serial Simpsons paraphraser',
            'bicyclist',
            'craft beer connoisseur',
            'Apple addict',
            'Angular acolyte',
            'diehard Mets fan',
            'Nintendo ninja',
            'space spectator',
            'former HR Professional',
            'HTML hitman',
            'Web Developer'
        ];

        thingsAboutMe = shuffle(thingsAboutMe);

            var thingsContainer = document.getElementById('thingsAboutMe'),
            node;

        thingsAboutMe.forEach(function(thing, index, arr) {
            if(thing === 'Web Developer') {
                node = document.createElement('a');
                node.className = 'web-dev';
                node.href = 'http://stackoverflow.com/story/itsmequinn';
                node.target = '_blank';
            } else {
                node = document.createElement('span');
                node.style.color = randomPastel();
            }

            node.innerHTML = thing + ' ';

            thingsContainer.appendChild(node);
        });

        setInterval(function() {
            var spans = thingsContainer.getElementsByTagName('span'),
                span;

            for(var i = 0; i < spans.length; i++) {
                span = spans[i];

                span.style.color = randomPastel();
            }
        }, 3000);
    });

    function randomPastel() {
        var red = Math.floor(Math.random() * 256),
            green = Math.floor(Math.random() * 256),
            blue = Math.floor(Math.random() * 256);

        red = Math.round((red + 255) / 2);
        green = Math.round((green + 255) / 2);
        blue = Math.round((blue + 255) / 2);

        return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    }

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
})(window);