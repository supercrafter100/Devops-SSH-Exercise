import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

const addKey = async (key: string, name: string) => {
    await ssh.connect({
        host: process.env.SSH_HOST,
        username: process.env.SSH_USERNAME,
        password: process.env.SSH_PASSWORD,
        port: 80,
    });

    // Add user if it doesn't exist
    await ssh.execCommand(`useradd -m -d /home/${name} -s /bin/bash ${name}`);

    // Creating .ssh folder if it doesn't exist
    await ssh.execCommand(`mkdir -p /home/${name}/.ssh`);

    // Creating authorized_keys file if it doesn't exist
    await ssh.execCommand(`touch /home/${name}/.ssh/authorized_keys`);

    console.log(`Connected! Adding key ${key}`);
    // Add key to authorized_keys
    const result = await ssh.execCommand(
        `echo "${key}" >> /home/${name}/.ssh/authorized_keys` // Single one to override previous key in case they fuck up
    );
    console.log(result);

    ssh.dispose();
    return true;
};

export default addKey;
