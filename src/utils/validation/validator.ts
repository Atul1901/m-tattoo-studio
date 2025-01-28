const regex = {
  email: new RegExp(
    '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}])|(([a-zA-Z\\-\\d]+\\.)+[a-zA-Z]{2,}))$'
  ),
  mobile: new RegExp(/^\d{10}$/),
  username: new RegExp(/^[a-zA-Z\d](?:[a-zA-Z\d_-]*[a-zA-Z\d])?$/),
  url: new RegExp(
    "^(https?://)?(www\\.)?([-a-z\\d]{1,63}\\.)*?[a-z\\d][-a-z\\d]{0,61}[a-z\\d]\\.[a-z]{2,6}(/[-\\w@+.~#?&/=%]*)?$"
  ),
  price: new RegExp(/^\d+(\.\d{1,2})?$/),
  number: new RegExp("^\\d+$"),
  amount: new RegExp(/^[+]?(\d+(?:[.]\d*)?|\.\d+)$/),
  floatNumber: new RegExp(/^\d+(\.\d{1,2})?$/),
  amountRefunded: new RegExp(/^d{10}$/),
  referenceNumber: new RegExp("^[a-zA-Z\\d]+$"),
  GST: new RegExp(
    /^(0[1-9]|[1-2]\d|3[0-5])([a-zA-Z]{5}\d{4}[a-zA-Z][1-9a-zA-Z][zZ][\da-zA-Z])+$/
  ),
  Time: new RegExp("^(\\d|0\\d|1\\d|2[0-3]):[0-5]\\d$"),
  pinCode: new RegExp(/^\d{6}$/),
  name: new RegExp(/^[a-zA-Z. ]+$/),
  nameWithoutSpace: new RegExp(/^[a-zA-Z.]+$/),
  password: new RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d])(?!.*\s).{8,32}$/
  ),
  specialCharacters: new RegExp(/[!@#$%^&*()]/),
  capitalCharacters: new RegExp(/[A-Z]/),
  hasNumber: new RegExp(/\d/),
  getNumericValueFromBegining: new RegExp(/(^\d+)(.+$)/i),
  numberWithoutCode: new RegExp(/^\+\d+/),
  numberWithoutSpaces: new RegExp(/\s/g),
  addCardName: new RegExp(/^[a-zA-Z\s]*$|^(2d|2D|3d|3D)$/),
  emailId: new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/),
  alphaNumericWithSpace: /^[a-zA-Z0-9\s]+$/,
};

type ValidatorParams = {
  value: any;
  key: string;
  field: string;
};

type Errors = {
  [key: string]: {
    message: string;
  };
};

export class Validator {
  value: any;
  key: string;
  field: string;
  errors: Errors;

  constructor({ value, key, field }: ValidatorParams) {
    this.value = value;
    this.key = key;
    this.field = field;
    this.errors = {};
  }

  required(): this {
    if (this.value.toString().trim() === "") {
      this.errors[this.key] = {
        message: `${this.field} is required`,
      };
    }
    return this;
  }

  atLeastOne(): this {
    if (this.value.length === 0) {
      this.errors[this.key] = {
        message: `${this.field} is required`,
      };
    }
    return this;
  }

  email = (): this => {
    const emailRegex = regex.email;
    if (!emailRegex.test(this.value.toString())) {
      this.errors[this.key] = { message: "Invalid email address" };
    }
    return this;
  };

  containsSpecialCharacter(): this {
    const specialCharsRegex = /[!'";\/#<>&=|$\\\-\*`~%^()+=,:{}\[\]]/g;
    if (!specialCharsRegex.test(this.value.toString())) {
      this.errors[this.key] = {
        message: `${this.field} must contain at least one special character`,
      };
    }
    return this;
  }

  minLength(length: number): this {
    if (this.value.length < length) {
      this.errors[this.key] = {
        message: `${this.field} must be at least ${length} characters long`,
      };
    }
    return this;
  }

  noSpecialCharacters(): this {
    const specialCharsRegex = /[!'";\/#<>&=|$\\\-\*`~%^()+=,:{}\[\] ]/g;
    const atCharRegex = /@/g;
    const dotCharRegex = /\./g;
    const underscoreCharRegex = /_/g;

    const atCharCount = (this.value.match(atCharRegex) || []).length;
    const dotCharCount = (this.value.match(dotCharRegex) || []).length;
    const underscoreCharCount = (this.value.match(underscoreCharRegex) || [])
      .length;

    if (specialCharsRegex.test(this.value.toString())) {
      this.errors[this.key] = {
        message: `${this.field} should not contain special characters or spaces`,
      };
    } else if (atCharCount > 1) {
      this.errors[this.key] = {
        message: `${this.field} should not contain more than one '@' character`,
      };
    } else if (dotCharCount > 1) {
      this.errors[this.key] = {
        message: `${this.field} should not contain more than one '.' character`,
      };
    } else if (underscoreCharCount > 1) {
      this.errors[this.key] = {
        message: `${this.field} should not contain more than one '_' character`,
      };
    }
    return this;
  }
}
