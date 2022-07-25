export namespace supervisor {
	
	export class Project {
	    project: string;
	    secret_key: string;
	    hosts: string[];
	
	    static createFrom(source: any = {}) {
	        return new Project(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.project = source["project"];
	        this.secret_key = source["secret_key"];
	        this.hosts = source["hosts"];
	    }
	}
	export class Projects {
	    supervisor: Project[];
	    app: string;
	    // Go type: CtlConf
	    appCommand: any;
	
	    static createFrom(source: any = {}) {
	        return new Projects(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.supervisor = this.convertValues(source["supervisor"], Project);
	        this.app = source["app"];
	        this.appCommand = this.convertValues(source["appCommand"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

export namespace apppost {
	
	export class AppHeader {
	    key: string;
	    value: string;
	
	    static createFrom(source: any = {}) {
	        return new AppHeader(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.key = source["key"];
	        this.value = source["value"];
	    }
	}
	export class AppPostParam {
	    method: string;
	    url: string;
	    headers: AppHeader[];
	    body: string;
	
	    static createFrom(source: any = {}) {
	        return new AppPostParam(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.method = source["method"];
	        this.url = source["url"];
	        this.headers = this.convertValues(source["headers"], AppHeader);
	        this.body = source["body"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class ResponseHeader {
	    key: string;
	    values: string[];
	
	    static createFrom(source: any = {}) {
	        return new ResponseHeader(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.key = source["key"];
	        this.values = source["values"];
	    }
	}
	export class AppPostResponse {
	    status_code: number;
	    headers: ResponseHeader[];
	    is_json: boolean;
	    response: string;
	
	    static createFrom(source: any = {}) {
	        return new AppPostResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.status_code = source["status_code"];
	        this.headers = this.convertValues(source["headers"], ResponseHeader);
	        this.is_json = source["is_json"];
	        this.response = source["response"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

