async function getData() {
    try {
        const response = await fetch('api/getGame.php', {
            method: 'GET',
        });

        const text = await response.text();

        console.log(text);
    
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // console.log('DOM loaded');
    getData();
});