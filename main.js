document.getElementById('thebutton').addEventListener('click', function () {
    let confirmAction = confirm('Are you sure you want to break the only rule?');
    if (confirmAction) {
        confirmAction = confirm("What a daring individual, but would you dare proceed?");
        if (confirmAction) {
            confirmAction = confirm("No");
            if (confirmAction) {
                confirmAction = confirm("You unconsentual fuck")
                if (confirmAction) {
                    confirmAction = confirm("I just might touch you back")
                    if (confirmAction) {
                        confirmAction = confirm("You asked for it")
                        if (confirmAction) {
                            window.location.href = 'pac-man.html';
                        }
                    }
                }
            }
        }
    }
});