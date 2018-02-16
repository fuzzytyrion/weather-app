console.log('starting app');

setTimeout(() => {
    console.log('Inside of callback');
}, 2000);

setTimeout(function ()  {
    console.log('Inside of callback 2')
}, 0);

console.log('finishing app');