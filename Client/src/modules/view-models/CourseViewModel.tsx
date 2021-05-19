export interface IViewModel {
    clear: () => void
}

export class ViewModelField<T> {
    constructor(value: T, attributes: any = {}) {
        this.value = value
        this.attributes = attributes
    }

    value: T
    attributes: any
    //stylizeWithAttrs = (attributes: Array<string>) => this.attributes = attributes
}

export class CourseViewModel implements IViewModel {
    constructor(description: string = "", name: string = "", subscriptionType: string = "default") {
        this.description = new ViewModelField<string>(description)
        this.name = new ViewModelField<string>(name)
        this.subscriptionType = new ViewModelField<string>(subscriptionType)
    }

    description: ViewModelField<string>
    name: ViewModelField<string>
    subscriptionType: ViewModelField<string>;

    clear = () => {
        this.description.value = "";
        this.subscriptionType.value = "default";
        this.name.value = "";
    }
}

/*слезы на глазах но с декораторами мы не в ладах

function required(errorMsg?: string) {
    return function (target: object, key: string): any {
        const err = errorMsg;
        let val: ViewModelField<string>;
        return {
            set: function (value: ViewModelField<string>) {
                val = value;
            },
            get: function () {
                if (!val.attributes.hasOwnProperty("required")) {
                    val.attributes.required = true;
                }
                return val;
            }
        };
    }
}*/


