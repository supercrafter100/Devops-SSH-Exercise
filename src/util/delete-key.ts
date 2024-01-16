import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

const deleteKey = async (name: string) => {
    await ssh.connect({
        host: process.env.SSH_HOST,
        username: process.env.SSH_USERNAME,
        password: process.env.SSH_PASSWORD,
        port: 80,
    });

    // Delete authorized_keys file if it exists
    await ssh.execCommand(`rm /home/${name}/.ssh/authorized_keys`);

    // Recreate authorized_keys file
    await ssh.execCommand(`touch /home/${name}/.ssh/authorized_keys`);

    ssh.dispose();
    return true;
};

export default deleteKey;
