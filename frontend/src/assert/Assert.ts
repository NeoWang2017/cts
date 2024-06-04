interface IDhparam {
  overage: string[];
  shortage: string[];
  type: any[];
  range: any[];
  enum: any[];
  value: any[];
  [key: string]: any; // 添加索引签名
}

// 断言类，用于校验实际结果和预期结果是否匹配
export class Assertion {
  private actual: any; // 实际返回结果

  private expected: any; // 预期结果

  private Dhparam: IDhparam = {
    overage: [], // 多参
    shortage: [], // 少参
    type: [], // 参数类型错误
    range: [], // 不在预期范围内
    enum: [], // 不在枚举范围内
    value: [], // 值不等于预期
  }

  constructor(actual: any, expected: any) {
    this.actual = actual;
    this.expected = expected;
  }

  // 验证函数，开始校验过程
  public validate(): boolean {
    if (this.expected) {
      this.validateObject(this.actual, this.expected);
      let status = true;
      const keys = Object.keys(this.Dhparam);
      for (const key of keys) {
        if (this.Dhparam[key].length > 0) {
          status = false;
          break;
        }
      }
      return status;
    } else {
     return true;
    }
  }

  public getDhparam() {
    return this.Dhparam;
  }

  // 递归校验对象的属性和值
  private validateObject(actual: any, expected: any, path: string = ''): void {
    // 校验预期对象中的所有属性
    for (const key in expected) {
      const actualValue = actual ? actual[key] : undefined;
      const expectedValue = expected[key];
      const currentPath = path ? `${path}.${key}` : key;

      if (actualValue === undefined) {
        // 如果实际值为 undefined，则表示参数缺失
        this.Dhparam.shortage.push(currentPath);
      } else if (typeof expectedValue === 'object' && !Array.isArray(expectedValue)) {
        if (expectedValue.range) {
          this.validateRange(actualValue, expectedValue.range, currentPath);
        } else if (expectedValue.enum) {
          this.validateEnum(actualValue, expectedValue.enum, currentPath);
        } else {
          this.validateObject(actualValue, expectedValue, currentPath);
        }
      } else {
        if (['number', 'string', 'boolean', 'object', 'array'].includes(expectedValue)) {
          this.validateType(actualValue, expectedValue, currentPath);
        } else {
          this.validateValue(actualValue, expectedValue, currentPath);
        }
      }
    }

    // 检查实际对象中是否有多余的属性
    for (const key in actual) {
      if (!(key in expected)) {
        const k = path ? `${path}.${key}` : key;
        this.Dhparam.overage.push(k);
      }
    }
  }

  // 校验数据类型是否匹配
  private validateType(actualValue: any, expectedType: string, path: string): void {
    const actualType = Array.isArray(actualValue) ? 'array' : typeof actualValue;

    if (actualType !== expectedType) {
      this.Dhparam.type.push({
        path,
        expect: expectedType,
        actual: actualType
      });
    }
  }

  // 校验值
  private validateValue(actualValue: any, expectValue: any, path: string): void {
    if (actualValue !== expectValue) {
      this.Dhparam.value.push({
        path,
        expect: expectValue,
        actual: actualValue
      });
    }
  }

  // 校验数值范围
  private validateRange(actualValue: any, range: string[], path: string): void {
    range.forEach(r => {
      const [operator, value] = [r.substring(0, 2), parseFloat(r.substring(2))];

      switch (operator) {
        case 'gt':
          if (!(actualValue > value)) {
            this.Dhparam.range.push({ path, expect: `>${value}`, actual: actualValue });
          }
          break;
        case 'lt':
          if (!(actualValue < value)) {
            this.Dhparam.range.push({ path, expect: `<${value}`, actual: actualValue });
          }
          break;
        case 'ge':
          if (!(actualValue >= value)) {
            this.Dhparam.range.push({ path, expect: `>=${value}`, actual: actualValue });
          }
          break;
        case 'le':
          if (!(actualValue <= value)) {
            this.Dhparam.range.push({ path, expect: `<=${value}`, actual: actualValue });
          }
          break;
        case 'ne':
          if (!(actualValue !== value)) {
            this.Dhparam.range.push({ path, expect: `!=${value}`, actual: actualValue });
          }
          break;
        default:
          throw new Error(`未知的范围操作符: ${path}: ${operator}`);
      }
    });
  }

  // 校验枚举值
  private validateEnum(actualValue: any, enumValues: any[], path: string): void {
    if (!enumValues.includes(actualValue)) {
      this.Dhparam.enum.push({ path, expect: enumValues, actual: actualValue });
    }
  }
}

/*
// 示例用例
const testCases = {
  name: "用例 1",
  params: {
    scope: "user.info.profile,video.list",
    returnScopes: true
  },
  expect: {
    params: {
      authResponse: {
        code: "string",
        grantedScopes: { enum: ["user.info.profile", "video.list"] },
        expiry: { range: ["gt0", "lt1000"] },
        active: "boolean",
        additionalInfo: "object",
        value: 'a'
      }
    }
  }
};

// 实际响应示例，包含多参、少参、类型错误、不在预期范围内、不在枚举范围内、值不等于预期
const actualResponse = {
  authResponse: {
    code: 12345, // 类型错误
    grantedScopes: "unknown.scope", // 不在枚举范围内
    expiry: 'abc', // 不在预期范围内
    active: "yes", // 类型错误
    // 缺少 additionalInfo 属性
    extraParam: "extra", // 多余参数
    value: 1
  }
};

// 校验通过
// const actualResponse = {
//   authResponse: {
//     code: '12345',
//     grantedScopes: "video.list",
//     expiry: 900,
//     active: false,
//     additionalInfo: {},
//     value: 'a'
//   }
// };

try {
  const assertion = new Assertion(actualResponse, testCase.expect?.params);
  const pass = assertion.validate();
  console.log(pass, assertion.getDhparam());
} catch (error) {
  console.error('校验失败:', error);
}
*/
