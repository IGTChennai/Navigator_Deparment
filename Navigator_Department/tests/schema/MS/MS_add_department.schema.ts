export const departmentList : any = {
    "definitions": {},
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "http://example.com/root.json",
    "type": "object",
    "title": "The Root Schema",
    "required": [
      "modifiedDatetime",
      "modifierId",
      "creationDatetime",
      "creatorId",
      "version",
      "departmentOid",
      "departmentId",
      "departmentName",
      "employer",
      "statusCode",
      "statusChgDatetime"
    ],
    "properties": {
      "modifiedDatetime": {
        "$id": "#/properties/modifiedDatetime",
        "type": "string",
        "title": "The Modifieddatetime Schema",
        "default": "",
        "examples": [
          "2019-07-05T06:44:43.495"
        ],
        "pattern": "^(.*)$"
      },
      "modifierId": {
        "$id": "#/properties/modifierId",
        "type": "string",
        "title": "The Modifierid Schema",
        "default": "",
        "examples": [
          "administrator"
        ],
        "pattern": "^(.*)$"
      },
      "creationDatetime": {
        "$id": "#/properties/creationDatetime",
        "type": "string",
        "title": "The Creationdatetime Schema",
        "default": "",
        "examples": [
          "2019-07-05T06:44:43.495"
        ],
        "pattern": "^(.*)$"
      },
      "creatorId": {
        "$id": "#/properties/creatorId",
        "type": "string",
        "title": "The Creatorid Schema",
        "default": "",
        "examples": [
          "administrator"
        ],
        "pattern": "^(.*)$"
      },
      "version": {
        "$id": "#/properties/version",
        "type": "integer",
        "title": "The Version Schema",
        "default": 0,
        "examples": [
          0
        ]
      },
      "departmentOid": {
        "$id": "#/properties/departmentOid",
        "type": "integer",
        "title": "The Departmentoid Schema",
        "default": 0,
        "examples": [
          1009
        ]
      },
      "departmentId": {
        "$id": "#/properties/departmentId",
        "type": "integer",
        "title": "The Departmentid Schema",
        "default": 0,
        "examples": [
          12
        ]
      },
      "departmentName": {
        "$id": "#/properties/departmentName",
        "type": "string",
        "title": "The Departmentname Schema",
        "default": "",
        "examples": [
          "CSS"
        ],
        "pattern": "^(.*)$"
      },
      "employer": {
        "$id": "#/properties/employer",
        "type": "object",
        "title": "The Employer Schema",
        "required": [
          "modifiedDatetime",
          "modifierId",
          "modifierIp",
          "creationDatetime",
          "creatorId",
          "creatorIp",
          "version",
          "statusCode",
          "statusChgDatetime",
          "employerOid",
          "ein",
          "employerName"
        ],
        "properties": {
          "modifiedDatetime": {
            "$id": "#/properties/employer/properties/modifiedDatetime",
            "type": "string",
            "title": "The Modifieddatetime Schema",
            "default": "",
            "examples": [
              "2019-07-02T07:16:49.159"
            ],
            "pattern": "^(.*)$"
          },
          "modifierId": {
            "$id": "#/properties/employer/properties/modifierId",
            "type": "string",
            "title": "The Modifierid Schema",
            "default": "",
            "examples": [
              "ms-base-load"
            ],
            "pattern": "^(.*)$"
          },
          "modifierIp": {
            "$id": "#/properties/employer/properties/modifierIp",
            "type": "string",
            "title": "The Modifierip Schema",
            "default": "",
            "examples": [
              "127.0.0.1"
            ],
            "pattern": "^(.*)$"
          },
          "creationDatetime": {
            "$id": "#/properties/employer/properties/creationDatetime",
            "type": "string",
            "title": "The Creationdatetime Schema",
            "default": "",
            "examples": [
              "2019-07-02T07:16:49.159"
            ],
            "pattern": "^(.*)$"
          },
          "creatorId": {
            "$id": "#/properties/employer/properties/creatorId",
            "type": "string",
            "title": "The Creatorid Schema",
            "default": "",
            "examples": [
              "ms-base-load"
            ],
            "pattern": "^(.*)$"
          },
          "creatorIp": {
            "$id": "#/properties/employer/properties/creatorIp",
            "type": "string",
            "title": "The Creatorip Schema",
            "default": "",
            "examples": [
              "127.0.0.1"
            ],
            "pattern": "^(.*)$"
          },
          "version": {
            "$id": "#/properties/employer/properties/version",
            "type": "integer",
            "title": "The Version Schema",
            "default": 0,
            "examples": [
              0
            ]
          },
          "statusCode": {
            "$id": "#/properties/employer/properties/statusCode",
            "type": "integer",
            "title": "The Statuscode Schema",
            "default": 0,
            "examples": [
              1
            ]
          },
          "statusChgDatetime": {
            "$id": "#/properties/employer/properties/statusChgDatetime",
            "type": "string",
            "title": "The Statuschgdatetime Schema",
            "default": "",
            "examples": [
              "2019-07-02T07:16:49.159"
            ],
            "pattern": "^(.*)$"
          },
          "employerOid": {
            "$id": "#/properties/employer/properties/employerOid",
            "type": "integer",
            "title": "The Employeroid Schema",
            "default": 0,
            "examples": [
              100
            ]
          },
          "ein": {
            "$id": "#/properties/employer/properties/ein",
            "type": "string",
            "title": "The Ein Schema",
            "default": "",
            "examples": [
              "00-0000100"
            ],
            "pattern": "^(.*)$"
          },
          "employerName": {
            "$id": "#/properties/employer/properties/employerName",
            "type": "string",
            "title": "The Employername Schema",
            "default": "",
            "examples": [
              "IGT Corporation"
            ],
            "pattern": "^(.*)$"
          }
        }
      },
      "statusCode": {
        "$id": "#/properties/statusCode",
        "type": "integer",
        "title": "The Statuscode Schema",
        "default": 0,
        "examples": [
          1
        ]
      },
      "statusChgDatetime": {
        "$id": "#/properties/statusChgDatetime",
        "type": "string",
        "title": "The Statuschgdatetime Schema",
        "default": "",
        "examples": [
          "2019-07-05T06:44:43.495"
        ],
        "pattern": "^(.*)$"
      }
    }
  }

export const editDepartList : any = {
    "definitions": {},
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "http://example.com/root.json",
    "type": "object",
    "title": "The Root Schema",
    "required": [
      "modifiedDatetime",
      "modifierId",
      "creationDatetime",
      "creatorId",
      "version",
      "departmentOid",
      "departmentId",
      "departmentName",
      "employer",
      "statusCode",
      "statusChgDatetime"
    ],
    "properties": {
      "modifiedDatetime": {
        "$id": "#/properties/modifiedDatetime",
        "type": "string",
        "title": "The Modifieddatetime Schema",
        "default": "",
        "examples": [
          "2019-07-05T06:58:43.754"
        ],
        "pattern": "^(.*)$"
      },
      "modifierId": {
        "$id": "#/properties/modifierId",
        "type": "string",
        "title": "The Modifierid Schema",
        "default": "",
        "examples": [
          "administrator"
        ],
        "pattern": "^(.*)$"
      },
      "creationDatetime": {
        "$id": "#/properties/creationDatetime",
        "type": "string",
        "title": "The Creationdatetime Schema",
        "default": "",
        "examples": [
          "2019-07-05T06:44:43.495"
        ],
        "pattern": "^(.*)$"
      },
      "creatorId": {
        "$id": "#/properties/creatorId",
        "type": "string",
        "title": "The Creatorid Schema",
        "default": "",
        "examples": [
          "administrator"
        ],
        "pattern": "^(.*)$"
      },
      "version": {
        "$id": "#/properties/version",
        "type": "integer",
        "title": "The Version Schema",
        "default": 0,
        "examples": [
          1
        ]
      },
      "departmentOid": {
        "$id": "#/properties/departmentOid",
        "type": "integer",
        "title": "The Departmentoid Schema",
        "default": 0,
        "examples": [
          1009
        ]
      },
      "departmentId": {
        "$id": "#/properties/departmentId",
        "type": "integer",
        "title": "The Departmentid Schema",
        "default": 0,
        "examples": [
          12
        ]
      },
      "departmentName": {
        "$id": "#/properties/departmentName",
        "type": "string",
        "title": "The Departmentname Schema",
        "default": "",
        "examples": [
          "CSS Depart"
        ],
        "pattern": "^(.*)$"
      },
      "employer": {
        "$id": "#/properties/employer",
        "type": "object",
        "title": "The Employer Schema",
        "required": [
          "modifiedDatetime",
          "modifierId",
          "modifierIp",
          "creationDatetime",
          "creatorId",
          "creatorIp",
          "version",
          "statusCode",
          "statusChgDatetime",
          "employerOid",
          "ein",
          "employerName"
        ],
        "properties": {
          "modifiedDatetime": {
            "$id": "#/properties/employer/properties/modifiedDatetime",
            "type": "string",
            "title": "The Modifieddatetime Schema",
            "default": "",
            "examples": [
              "2019-07-02T07:16:49.159"
            ],
            "pattern": "^(.*)$"
          },
          "modifierId": {
            "$id": "#/properties/employer/properties/modifierId",
            "type": "string",
            "title": "The Modifierid Schema",
            "default": "",
            "examples": [
              "ms-base-load"
            ],
            "pattern": "^(.*)$"
          },
          "modifierIp": {
            "$id": "#/properties/employer/properties/modifierIp",
            "type": "string",
            "title": "The Modifierip Schema",
            "default": "",
            "examples": [
              "127.0.0.1"
            ],
            "pattern": "^(.*)$"
          },
          "creationDatetime": {
            "$id": "#/properties/employer/properties/creationDatetime",
            "type": "string",
            "title": "The Creationdatetime Schema",
            "default": "",
            "examples": [
              "2019-07-02T07:16:49.159"
            ],
            "pattern": "^(.*)$"
          },
          "creatorId": {
            "$id": "#/properties/employer/properties/creatorId",
            "type": "string",
            "title": "The Creatorid Schema",
            "default": "",
            "examples": [
              "ms-base-load"
            ],
            "pattern": "^(.*)$"
          },
          "creatorIp": {
            "$id": "#/properties/employer/properties/creatorIp",
            "type": "string",
            "title": "The Creatorip Schema",
            "default": "",
            "examples": [
              "127.0.0.1"
            ],
            "pattern": "^(.*)$"
          },
          "version": {
            "$id": "#/properties/employer/properties/version",
            "type": "integer",
            "title": "The Version Schema",
            "default": 0,
            "examples": [
              0
            ]
          },
          "statusCode": {
            "$id": "#/properties/employer/properties/statusCode",
            "type": "integer",
            "title": "The Statuscode Schema",
            "default": 0,
            "examples": [
              1
            ]
          },
          "statusChgDatetime": {
            "$id": "#/properties/employer/properties/statusChgDatetime",
            "type": "string",
            "title": "The Statuschgdatetime Schema",
            "default": "",
            "examples": [
              "2019-07-02T07:16:49.159"
            ],
            "pattern": "^(.*)$"
          },
          "employerOid": {
            "$id": "#/properties/employer/properties/employerOid",
            "type": "integer",
            "title": "The Employeroid Schema",
            "default": 0,
            "examples": [
              100
            ]
          },
          "ein": {
            "$id": "#/properties/employer/properties/ein",
            "type": "string",
            "title": "The Ein Schema",
            "default": "",
            "examples": [
              "00-0000100"
            ],
            "pattern": "^(.*)$"
          },
          "employerName": {
            "$id": "#/properties/employer/properties/employerName",
            "type": "string",
            "title": "The Employername Schema",
            "default": "",
            "examples": [
              "IGT Corporation"
            ],
            "pattern": "^(.*)$"
          }
        }
      },
      "statusCode": {
        "$id": "#/properties/statusCode",
        "type": "integer",
        "title": "The Statuscode Schema",
        "default": 0,
        "examples": [
          1
        ]
      },
      "statusChgDatetime": {
        "$id": "#/properties/statusChgDatetime",
        "type": "string",
        "title": "The Statuschgdatetime Schema",
        "default": "",
        "examples": [
          "2019-07-05T06:44:43.495"
        ],
        "pattern": "^(.*)$"
      }
    }
  }