class MyPromise {
    constructor(func) {
        this.promiseChain = []

        this.onResolve = this.onResolve.bind(this)
        this.onReject = this.onReject.bind(this)
      
        func(this.onResolve, this.onReject)
    }

    onResolve(value) {
        let storedValue = value

        try {
            for (const thenFunc of this.promiseChain) {
                storedValue = thenFunc(storedValue)
            }
        } catch (error) {
            this.promiseChain = []
            this.onReject(error)
        }
    }

    onReject(err) {
        this.errFunc(err)
    }

    catch(func) {
        this.errFunc = func
        return this
    }

    then(func) {
        this.promiseChain.push(func)
        return this
    }
}