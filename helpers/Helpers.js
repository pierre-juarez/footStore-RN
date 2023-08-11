const generateUUID = () => {
  const chars = '0123456789abcdef';
  const segments = [8, 4, 4, 4, 12];

  let uuid = '';
  for (const segment of segments) {
    for (let i = 0; i < segment; i++) {
      uuid += chars[Math.floor(Math.random() * 16)];
    }
    if (segment !== 12) {
      uuid += '-';
    }
  }

  return uuid;
};

const generateToken = (length = 32) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }

  return token;
}

const capitalizeString = (string) => {
  if (typeof string !== 'string' || string.length === 0) {
    return string;
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
};


export  { generateUUID, generateToken, capitalizeString }