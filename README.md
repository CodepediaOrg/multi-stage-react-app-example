This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


# Deploy on Kubernetes

## Normal objects

### Build docker image
```
$ docker build --tag multi-stage-react-app-example:latest .
```

#### Deploy with native `kubectl` commands
```
kubectl apply -f kubernetes/config-dev.yaml # creates the configMap in the Kubernetes cluster
kubectl apply -f kubernetes/deployment.yaml
kubectl apply -f kubernetes/service.yaml
```

** Undo deployments ** 

```
kubectl delete configMap multi-stage-react-app-example-config
kubectl delete deployment multi-stage-react-app-example
kubectl delete service multi-stage-react-app-example
```

Forward port 

```
kubectl port-forward svc/multi-stage-react-app-example 3001:80
```

Then access the app at [http://localhost:3001](http://localhost:3001)

## Deploy with [helm](https://helm.sh/)

### Create release
```
helm upgrade dev-release ./helm-chart/ --install --force --values helm-chart/config-values/config-dev.yaml
helm ls #verify dev-release is present
```


### Undo release

```
helm delete --purge dev-release
```

## Deploy with [kustomize](https://kustomize.io/)

Build with kustomize to see what Kubernetes objects are generated
```
kustomize build kustomize/base/
```

Apply base
```
kubectl apply -k kustomize/base
```

Undo
```
kubectl delete -k kustomize/base
```

Apply DEV overlay
```
kubectl apply -k kustomize/overlays/dev
```

Undo
```
kubectl delete -k kustomize/overlays/dev
```
