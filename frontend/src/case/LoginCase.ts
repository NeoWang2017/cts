export const LoginCaseList = [
  {
    name: "1.返回scopes",
    params: {
      scope: "user.info.basic",
      returnScopes: true
    },
    expect: {
      params: {
        user: {
          avatar_url: 'string',
          open_id: 'string',
          union_id: 'number',
        }
      }
    }
  },
  {
    name: "2.不返回scopes",
    params: {
      scope: "user.info.basic",
      returnScopes: false
    }
  },
  {
    name: "3.默认的scope",
    params: {
      returnScopes: false
    }
  },
  {
    name: "4.无权使用的scopes",
    params: {
      scope: "video.list",
      returnScopes: false
    }
  },
  {
    name: "4.无权&有权使用的scopes组合",
    params: {
      scope: "user.info.basic,user.setting.update",
      returnScopes: false
    }
  },
]