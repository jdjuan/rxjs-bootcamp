const generalStyles = [
    'color: white',
    'padding: 2px 4px',
    'font-size: 1rem',
];

const errorStyle = [
    ...generalStyles,
    'background: #d43f3a'
].join(';');

const successStyle = [
    ...generalStyles,
    'background: #4cae4c',
].join(';');

const infoStyle = [
    ...generalStyles,
    'background: #3232c7',
].join(';');

const error = (...variables) => {
    log(errorStyle, variables);
}

const success = (...variables) => {
    log(successStyle, variables);
}

const info = (...variables) => {
    log(infoStyle, variables);
}

const log = (style = '', ...variables) => {
    console.log(`%c${variables.join(' ')}`, style);
}

const cute = { success, error, info }

export default cute;
