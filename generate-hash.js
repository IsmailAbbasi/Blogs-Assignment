const bcrypt = require('bcryptjs');

async function hashPassword() {
  const hash = await bcrypt.hash('AdminPass@100', 10);
  console.log('HASH:', hash);
}

hashPassword();
