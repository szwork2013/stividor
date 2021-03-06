import Client from 'kubernetes-client';

export default class Kubernetes {
    static options = {
        url: process.env.REACT_APP_KUBERNETES_URL,
        insecureSkipTlsVerify: true,
        auth: {
            user: process.env.REACT_APP_KUBERNETES_USERNAME,
            pass: process.env.REACT_APP_KUBERNETES_PASSWORD
        }
    };

    static create() {
        return new Client(Kubernetes.options);
    }

    static createExtensions() {
        return new Client.Extensions(Kubernetes.options);
    }

    static fetchDeploymentsByName(name, callback) {
        return Kubernetes.createExtensions()
            .deployments
            .get({ qs: { fieldSelector: 'metadata.name=' + name }}, callback);
    }

    static fetchDeploymentByNamespace(namespace, name, callback) {
        return Kubernetes.createExtensions().namespace(namespace).deployment(name).get(callback);
    }

    static fetchNamespaces(callback) {
        return Kubernetes.create().namespaces.get(callback);
    }

    static patchDeployment(namespace, name, patch, callback) {
        return Kubernetes.createExtensions().namespace(namespace).deployment(name).patch({
            body: patch,
            qs: {
                pretty: true
            }
        }, callback);
    }
}