export const billingHistoryData = [
  {
    userFriendlyId: 'T-0001',
    email: 'prakash@revrrlabs.com',
    risk: 'High',
    provider: 'chatgpt',
    activities: [
      {
        title: 'Today',
        threads: [
          {
            avatar: 'user',
            username: 'Prakash A',
            logMessage: 'sent a text into',
            alias: 'ChatGPT',
            date: '09:28 PM',
            risk: 'high',
            issueStatus: 'Dismissed',
            message: `import boto3

            # Placeholder values
            ssn = "<SSN>"
            aws_secret_key = "<aws_secret_key>"
            
            # Example function to perform some operation using AWS services
            def process_data():
                # Initialize AWS client using the secret key
                client = boto3.client(
                    's3',
                    aws_access_key_id='YOUR_ACCESS_KEY_ID',
                    aws_secret_access_key=aws_secret_key,
                )
            
                # Example operation - listing S3 buckets
                response = client.list_buckets()
                print("S3 Buckets:")
                for bucket in response['Buckets']:
                    print(f' {bucket["Name"]}')
            
            # Example function to process SSN
            def process_ssn(ssn):
                # Example operation - masking SSN
                masked_ssn = "<SSN>" + ssn[-4:]
                print("Masked SSN:", masked_ssn)
            
            # Main function
            def main():
                # Process SSN
                process_ssn(ssn)
            
                # Process data using AWS
                process_data()
            
            if __name__ == "__main__":
                main()`,
            violationList: [
              {
                issueType: 'SSN',
                issueResolveType: 'Block',
                userUpdateType: "Redacted"
              },
              {
                issueType: 'AWS Access Token',
                issueResolveType: 'Block',
                userUpdateType: "Redacted"
              }
            ]
          },
          {
            avatar: 'https://img.icons8.com/ios-glyphs/30/chatgpt.png',
            username: 'ChatGPT',
            logMessage: 'response with answer',
            issueStatus: 'Received',
            risk: 'none',
            alias: '',
            date: '09:28 PM',
            message: `Remember, in a real-world scenario, you would never hardcode sensitive data like AWS secret keys directly into your code. Instead, you would use secure methods for managing secrets, such as environment variables, AWS Secrets Manager, or AWS Parameter Store, combined with proper IAM permissions. Additionally, SSNs should always be handled with extreme care and in compliance with relevant privacy and security regulations.`
          },
        ],
      },
    ],
    issues: [
      {
        issueType: 'SSN',
        issueResolveType: 'Redact',
        userUpdateType: "Redacted"
      },
      {
        issueType: 'AWS Access Token',
        issueResolveType: 'Redact',
        userUpdateType: "Redacted"
      }
    ],
    createdAt: '2023-08-18T10:46:52.249Z',
  },
  {
    userFriendlyId: 'T-0002',
    email: 'prakash@revrrlabs.com',
    risk: 'Low',
    issueStatus: 'Blocked',
    provider: 'grammarly',
    issues: [
      {
        issueType: 'AWS Access Token',
        issueResolveType: 'Redact',
        userUpdateType: "Redacted"
      },
      {
        issueType: 'Github Access Token',
        issueResolveType: 'Dismiss',
        userUpdateType: "Redacted"
      }
    ],
    activities: [
      {
        title: 'Today',
        threads: [
          {
            avatar: 'user',
            username: 'Prakash A',
            logMessage: 'sent a text into',
            alias: 'Grammarly',
            date: '09:28 PM',
            risk: 'high',
            issueStatus: 'Dismissed',
            message: "To add a function to handle row click events in the rc-table component in React, you can use the onRow prop to specify a function that will be called when a row is clicked. This function will receive the clicked row's data and index as arguments. Here's ",
            violationList: [
              {
                issueType: 'SSN',
                issueResolveType: 'Dismiss',
                userUpdateType: "Dismissed"
              },
              {
                issueType: 'AWS Access Token',
                issueResolveType: 'Dismiss',
                userUpdateType: "Dismissed"
              }
            ]
          },
          {
            avatar: 'https://img.icons8.com/ios-glyphs/30/chatgpt.png',
            username: 'Grammarly',
            logMessage: 'response with answer',
            issueStatus: 'Received',
            risk: 'none',
            alias: '',
            date: '09:28 PM',
            message: `import React from 'react';
              import { Avatar } from '@rizz/ui';
              import { PiUser } from 'react-icons/pi';
              
              const MyComponent = () => {
                return (
                  <Avatar
                    src={<PiUser />}
                    size='sm'
                    name="Prakash A"
                    color="primary"
                    className='text-white text-xs bg-primary mr-2 h-6 w-6'
                  />
                );
              };
              export default MyComponent;
              `
          },
        ],
      },
    ],
    createdAt: '2023-08-18T10:46:52.249Z',
  },
  {
    userFriendlyId: 'T-0003',
    email: 'prakash@revrrlabs.com',
    risk: 'Medium',
    issueStatus: 'Blocked',
    provider: 'google',
    activities: [
      {
        title: 'Today',
        threads: [
          {
            avatar: 'user',
            username: 'Prakash A',
            logMessage: 'sent a text into',
            alias: 'Google',
            date: '09:28 PM',
            risk: 'high',
            issueStatus: 'Dismissed',
            message: "To add a function to handle row click events in the rc-table component in React, you can use the onRow prop to specify a function that will be called when a row is clicked. This function will receive the clicked row's data and index as arguments. Here's ",
            violationList: [
              {
                issueType: 'SSN',
                issueResolveType: 'Dismiss',
                userUpdateType: "Dismissed"
              },
              {
                issueType: 'AWS Access Token',
                issueResolveType: 'Dismiss',
                userUpdateType: "Dismissed"
              }
            ]
          },
          {
            avatar: 'https://img.icons8.com/ios-glyphs/30/chatgpt.png',
            username: 'Google',
            logMessage: 'response with answer',
            issueStatus: 'Received',
            risk: 'none',
            alias: '',
            date: '09:28 PM',
            message: `import React from 'react';
              import { Avatar } from '@rizz/ui';
              import { PiUser } from 'react-icons/pi';
              
              const MyComponent = () => {
                return (
                  <Avatar
                    src={<PiUser />}
                    size='sm'
                    name="Prakash Anki"
                    color="primary"
                    className='text-white text-xs bg-primary mr-2 h-6 w-6'
                  />
                );
              };
              export default MyComponent;
              `
          },
          {
            avatar: 'user',
            username: 'Prakash A',
            logMessage: 'sent a text into',
            alias: 'Google',
            date: '09:28 PM',
            risk: 'high',
            issueStatus: 'Dismissed',
            message: "To add a function to handle row click events in the rc-table component in React, you can use the onRow prop to specify a function that will be called when a row is clicked. This function will receive the clicked row's data and index as arguments. Here's ",
            violationList: [
              {
                issueType: 'SSN',
                issueResolveType: 'Dismiss',
                userUpdateType: "Dismissed"
              },
              {
                issueType: 'AWS Access Token',
                issueResolveType: 'Dismiss',
                userUpdateType: "Dismissed"
              }
            ]
          },
          {
            avatar: 'https://img.icons8.com/ios-glyphs/30/chatgpt.png',
            username: 'Google',
            logMessage: 'response with answer',
            issueStatus: 'Received',
            risk: 'none',
            alias: '',
            date: '09:28 PM',
            message: `$(document).on('transactionModalClosed', function (event, selectedToAccountInfo) {
              var selectedToAccountId = selectedToAccountInfo.transferViewBean.toAccount.accountId;
              var container = $('[data-panel-container-main]').find('[data-fragment-name=mwf-selfpay-ui-home]');
              var toAccountContainer = container.find('[data-select-to-account-container]');
          
              // Reset "From Account" selection
              store.dispatch(actions.clearSelectedFromAccount());
              store.dispatch(actions.setIsFromAccountSelected(false));
          
              // Auto-fill the "To Account" if needed
              if (selectedToAccountId) {
                  store.dispatch(actions.setSelectedToAccount(selectedToAccountId));
                  $('[data-select-to-account]').val(selectedToAccountId).trigger('change');
              }
          
              // Trigger any necessary events or updates
              store.dispatch(actions.fetchHomeMortgageMessages());
              delete mwfGlobals.pageFirstTimeLoad;
              $(document).trigger('mwfAfterPageLoad', { pageLoadFocusElement: toAccountContainer });
          
              // Close the modal or perform additional actions if needed
          });
          
              `
          },
        ],
      },
    ],
    issues: [
      {
        issueType: 'AWS Access Token',
        issueResolveType: 'Dismiss',
        userUpdateType: "Dismissed"
      },
      {
        issueType: 'SSN',
        issueResolveType: 'Dismiss',
        userUpdateType: "Dismissed"
      },
    ],
    createdAt: '2023-08-18T10:46:52.249Z',
  }
];


export const billingHistoryColumns = [
  {
    "_id": "65d65cc5851cf750fbfe3f42",
    "email": "penchalanki+dev1@gmail.com",
    "userFriendlyId": 101,
    "chatText": "sample test to check for violation errors in email test@gmaiEMAIL_ADDRESS\n",
    "issues": [
      {
        "category": "PERSONAL_IDENTIFIABLE_INFORMATION",
        "entitySeverity": "HIGH",
        "entityAction": "DISMISS",
        "startIndex": 51,
        "endIndex": 64,
        "entityType": "EMAIL_ADDRESS",
        "userAction": "REDACTED",
        "_id": "65d65cbf851cf750fbfe3f3a"
      }
    ],
    "risk": "HIGH",
    "provider": "chatGPT",
    "orgId": "65d5bab2e3e16ef38d889fdd",
    "messageId": "aaa27fce-ce19-4733-9b37-f6c8cbdb5064",
    "createdById": "65d5bab2e3e16ef38d889fdf",
    "createdAt": "2024-02-21T13:29:45.048Z",
    "__v": 0
  },
  {
    "_id": "65d65d74851cf750fbfe3f54",
    "email": "penchalanki+dev1@gmail.com",
    "userFriendlyId": 102,
    "chatText": "sample test to check for violation errors in email test@gmaiEMAIL_ADDRESS\n",
    "issues": [
      {
        "category": "PERSONAL_IDENTIFIABLE_INFORMATION",
        "entitySeverity": "HIGH",
        "entityAction": "DISMISS",
        "startIndex": 51,
        "endIndex": 64,
        "entityType": "EMAIL_ADDRESS",
        "userAction": "REDACTED",
        "_id": "65d65d5f851cf750fbfe3f4b"
      }
    ],
    "risk": "HIGH",
    "provider": "chatGPT",
    "orgId": "65d5bab2e3e16ef38d889fdd",
    "messageId": "\"aaa27211-0240-44c5-8be8-5295da5aa5fb\"",
    "createdById": "65d5bab2e3e16ef38d889fdf",
    "createdAt": "2024-02-21T13:29:45.048Z",
    "__v": 0
  },
  {
    "_id": "65d65dbc851cf750fbfe3f66",
    "email": "penchalanki+dev1@gmail.com",
    "userFriendlyId": 103,
    "chatText": "sample test to check for violation errors in email test@gmaiEMAIL_ADDRESS\n",
    "issues": [
      {
        "category": "PERSONAL_IDENTIFIABLE_INFORMATION",
        "entitySeverity": "HIGH",
        "entityAction": "DISMISS",
        "startIndex": 51,
        "endIndex": 64,
        "entityType": "EMAIL_ADDRESS",
        "userAction": "REDACTED",
        "_id": "65d65daa851cf750fbfe3f5d"
      }
    ],
    "risk": "HIGH",
    "provider": "chatGPT",
    "orgId": "65d5bab2e3e16ef38d889fdd",
    "messageId": "aaa2d37a-059d-446b-ae86-60024dd1a4f6",
    "createdById": "65d5bab2e3e16ef38d889fdf",
    "createdAt": "2024-02-21T13:29:45.048Z",
    "__v": 0
  },
  {
    "_id": "65d65e62851cf750fbfe3f78",
    "email": "penchalanki+dev1@gmail.com",
    "userFriendlyId": 104,
    "chatText": "sample test to check for violation errors in email test@gmaiEMAIL_ADDRESS\n",
    "issues": [
      {
        "category": "PERSONAL_IDENTIFIABLE_INFORMATION",
        "entitySeverity": "HIGH",
        "entityAction": "DISMISS",
        "startIndex": 51,
        "endIndex": 64,
        "entityType": "EMAIL_ADDRESS",
        "userAction": "REDACTED",
        "_id": "65d65e5a851cf750fbfe3f6f"
      }
    ],
    "risk": "HIGH",
    "provider": "chatGPT",
    "orgId": "65d5bab2e3e16ef38d889fdd",
    "messageId": "aaa25f84-1836-4a5e-94b0-79ae6d94b849",
    "createdById": "65d5bab2e3e16ef38d889fdf",
    "createdAt": "2024-02-21T13:29:45.048Z",
    "__v": 0
  },
  {
    "_id": "65d65ffc851cf750fbfe3f8a",
    "email": "penchalanki+dev1@gmail.com",
    "userFriendlyId": 105,
    "chatText": "sample test to check for violation errors in email test@gmaiEMAIL_ADDRESS\n",
    "issues": [
      {
        "category": "PERSONAL_IDENTIFIABLE_INFORMATION",
        "entitySeverity": "HIGH",
        "entityAction": "DISMISS",
        "startIndex": 51,
        "endIndex": 64,
        "entityType": "EMAIL_ADDRESS",
        "userAction": "REDACTED",
        "_id": "65d65ff7851cf750fbfe3f81"
      }
    ],
    "risk": "HIGH",
    "provider": "chatGPT",
    "orgId": "65d5bab2e3e16ef38d889fdd",
    "messageId": "aaa2f322-35ee-4363-94d2-72eac5ccf7bc",
    "createdById": "65d5bab2e3e16ef38d889fdf",
    "createdAt": "2024-02-21T13:29:45.048Z",
    "__v": 0
  },
  {
    "_id": "65d6642f851cf750fbfe3f9c",
    "email": "penchalanki+dev1@gmail.com",
    "userFriendlyId": 106,
    "chatText": "sample test to check for violation errors in email test@gmaiEMAIL_ADDRESS\n",
    "issues": [
      {
        "category": "PERSONAL_IDENTIFIABLE_INFORMATION",
        "entitySeverity": "HIGH",
        "entityAction": "DISMISS",
        "startIndex": 51,
        "endIndex": 64,
        "entityType": "EMAIL_ADDRESS",
        "userAction": "REDACTED",
        "_id": "65d66427851cf750fbfe3f93"
      }
    ],
    "risk": "HIGH",
    "provider": "chatGPT",
    "orgId": "65d5bab2e3e16ef38d889fdd",
    "messageId": "aaa26308-0568-4207-8ed3-c4aea92f025b",
    "createdById": "65d5bab2e3e16ef38d889fdf",
    "createdAt": "2024-02-21T13:29:45.048Z",
    "__v": 0
  },
  {
    "_id": "65d664a0851cf750fbfe3faf",
    "email": "penchalanki+dev1@gmail.com",
    "userFriendlyId": 107,
    "chatText": "sample test to check for violation errors in email test@gmaiEMAIL_ADDRESS\n",
    "issues": [
      {
        "category": "PERSONAL_IDENTIFIABLE_INFORMATION",
        "entitySeverity": "HIGH",
        "entityAction": "DISMISS",
        "startIndex": 51,
        "endIndex": 64,
        "entityType": "EMAIL_ADDRESS",
        "userAction": "REDACTED",
        "_id": "65d66427851cf750fbfe3f93"
      },
      {
        "category": "PERSONAL_IDENTIFIABLE_INFORMATION",
        "entitySeverity": "HIGH",
        "entityAction": "DISMISS",
        "startIndex": 51,
        "endIndex": 64,
        "entityType": "EMAIL_ADDRESS",
        "userAction": "REDACTED",
        "_id": "65d6647b851cf750fbfe3fa5"
      }
    ],
    "risk": "HIGH",
    "provider": "chatGPT",
    "orgId": "65d5bab2e3e16ef38d889fdd",
    "messageId": "aaa224d9-2532-4e4d-b148-60296e8bd09c",
    "createdById": "65d5bab2e3e16ef38d889fdf",
    "createdAt": "2024-02-21T13:29:45.048Z",
    "__v": 0
  },
  {
    "_id": "65d66521851cf750fbfe3fc4",
    "email": "penchalanki+dev1@gmail.com",
    "userFriendlyId": 108,
    "chatText": "sample test to check for violation errors in email test@gmaiEMAIL_ADDRESS\n",
    "issues": [
      {
        "category": "PERSONAL_IDENTIFIABLE_INFORMATION",
        "entitySeverity": "HIGH",
        "entityAction": "DISMISS",
        "startIndex": 51,
        "endIndex": 64,
        "entityType": "EMAIL_ADDRESS",
        "userAction": "REDACTED",
        "_id": "65d6651e851cf750fbfe3fba"
      }
    ],
    "risk": "HIGH",
    "provider": "chatGPT",
    "orgId": "65d5bab2e3e16ef38d889fdd",
    "messageId": "aaa210a2-4146-49ed-9132-a94012a6beea",
    "createdById": "65d5bab2e3e16ef38d889fdf",
    "createdAt": "2024-02-21T13:29:45.048Z",
    "__v": 0
  },
  {
    "_id": "65d66776851cf750fbfe3fd6",
    "email": "penchalanki+dev1@gmail.com",
    "userFriendlyId": 109,
    "chatText": "sample test to check for violation errors in email test@gmaiEMAIL_ADDRESS\n",
    "issues": [
      {
        "category": "PERSONAL_IDENTIFIABLE_INFORMATION",
        "entitySeverity": "HIGH",
        "entityAction": "DISMISS",
        "startIndex": 51,
        "endIndex": 64,
        "entityType": "EMAIL_ADDRESS",
        "userAction": "REDACTED",
        "_id": "65d66772851cf750fbfe3fcd"
      }
    ],
    "risk": "HIGH",
    "provider": "chatGPT",
    "orgId": "65d5bab2e3e16ef38d889fdd",
    "messageId": "aaa25143-6c4e-499f-abe1-ffc92b949f18",
    "createdById": "65d5bab2e3e16ef38d889fdf",
    "createdAt": "2024-02-21T13:29:45.048Z",
    "__v": 0
  },
  {
    "_id": "65d6691c851cf750fbfe3fe8",
    "email": "penchalanki+dev1@gmail.com",
    "userFriendlyId": 110,
    "chatText": "sample test to check for violation errors in email test@gmaiEMAIL_ADDRESS\n",
    "issues": [
      {
        "category": "PERSONAL_IDENTIFIABLE_INFORMATION",
        "entitySeverity": "HIGH",
        "entityAction": "DISMISS",
        "startIndex": 51,
        "endIndex": 64,
        "entityType": "EMAIL_ADDRESS",
        "userAction": "REDACTED",
        "_id": "65d66913851cf750fbfe3fdf"
      }
    ],
    "risk": "HIGH",
    "provider": "chatGPT",
    "orgId": "65d5bab2e3e16ef38d889fdd",
    "messageId": "aaa2c924-e4cf-4d17-9ba5-e50d9dd52c4d",
    "createdById": "65d5bab2e3e16ef38d889fdf",
    "createdAt": "2024-02-21T13:29:45.048Z",
    "__v": 0
  },
  {
    "_id": "65d66995851cf750fbfe3ffa",
    "email": "penchalanki+dev1@gmail.com",
    "userFriendlyId": 111,
    "chatText": "sample test to check for violation errors in email test@gmaiEMAIL_ADDRESS\n",
    "issues": [
      {
        "category": "PERSONAL_IDENTIFIABLE_INFORMATION",
        "entitySeverity": "HIGH",
        "entityAction": "DISMISS",
        "startIndex": 51,
        "endIndex": 64,
        "entityType": "EMAIL_ADDRESS",
        "userAction": "REDACTED",
        "_id": "65d66985851cf750fbfe3ff1"
      }
    ],
    "risk": "HIGH",
    "provider": "chatGPT",
    "orgId": "65d5bab2e3e16ef38d889fdd",
    "messageId": "aaa24225-50c7-4705-aa24-f2d8292ff204",
    "createdById": "65d5bab2e3e16ef38d889fdf",
    "createdAt": "2024-02-21T13:29:45.048Z",
    "__v": 0
  },
  {
    "_id": "65d66a90851cf750fbfe400c",
    "email": "penchalanki+dev1@gmail.com",
    "userFriendlyId": 112,
    "chatText": "sample test to check for violation errors in email test@gmaiEMAIL_ADDRESS\n",
    "issues": [
      {
        "category": "PERSONAL_IDENTIFIABLE_INFORMATION",
        "entitySeverity": "HIGH",
        "entityAction": "DISMISS",
        "startIndex": 51,
        "endIndex": 64,
        "entityType": "EMAIL_ADDRESS",
        "userAction": "REDACTED",
        "_id": "65d66a8d851cf750fbfe4003"
      }
    ],
    "risk": "HIGH",
    "provider": "chatGPT",
    "orgId": "65d5bab2e3e16ef38d889fdd",
    "messageId": "aaa20094-4452-4943-87dc-437bf597bd1c",
    "createdById": "65d5bab2e3e16ef38d889fdf",
    "createdAt": "2024-02-21T13:29:45.048Z",
    "__v": 0
  },
  {
    "_id": "65d66bf4851cf750fbfe4023",
    "email": "penchalanki+dev1@gmail.com",
    "userFriendlyId": 113,
    "chatText": "sample test to check for violation errors in email test@gmaiEMAIL_ADDRESS",
    "issues": [
      {
        "category": "PERSONAL_IDENTIFIABLE_INFORMATION",
        "entitySeverity": "HIGH",
        "entityAction": "DISMISS",
        "startIndex": 51,
        "endIndex": 64,
        "entityType": "EMAIL_ADDRESS",
        "userAction": "REDACTED",
        "_id": "65d66bf0851cf750fbfe401a"
      }
    ],
    "risk": "HIGH",
    "provider": "chatGPT",
    "orgId": "65d5bab2e3e16ef38d889fdd",
    "messageId": "aaa2d907-fb5b-4c8c-90d8-33cb44592b2c",
    "createdById": "65d5bab2e3e16ef38d889fdf",
    "createdAt": "2024-02-21T13:29:45.048Z",
    "__v": 0
  },
  {
    "_id": "65d66c62851cf750fbfe4035",
    "email": "penchalanki+dev1@gmail.com",
    "userFriendlyId": 114,
    "chatText": "sample test to check for violation errors in email test@gmaiEMAIL_ADDRESS",
    "issues": [
      {
        "category": "PERSONAL_IDENTIFIABLE_INFORMATION",
        "entitySeverity": "HIGH",
        "entityAction": "DISMISS",
        "startIndex": 51,
        "endIndex": 64,
        "entityType": "EMAIL_ADDRESS",
        "userAction": "REDACTED",
        "_id": "65d66c5c851cf750fbfe402c"
      }
    ],
    "risk": "HIGH",
    "provider": "chatGPT",
    "orgId": "65d5bab2e3e16ef38d889fdd",
    "messageId": "aaa22fdd-0c00-4b04-a0f2-8c9884736849",
    "createdById": "65d5bab2e3e16ef38d889fdf",
    "createdAt": "2024-02-21T13:29:45.048Z",
    "__v": 0
  },
  {
    "_id": "65d6e343851cf750fbfe40f9",
    "email": "penchalanki+dev1@gmail.com",
    "userFriendlyId": 115,
    "chatText": "sample test to check for violation errors in email test@gmaiEMAIL_ADDRESS",
    "issues": [
      {
        "category": "PERSONAL_IDENTIFIABLE_INFORMATION",
        "entitySeverity": "HIGH",
        "entityAction": "DISMISS",
        "startIndex": 51,
        "endIndex": 64,
        "entityType": "EMAIL_ADDRESS",
        "userAction": "REDACTED",
        "_id": "65d6e338851cf750fbfe40f0"
      }
    ],
    "risk": "HIGH",
    "provider": "chatGPT",
    "orgId": "65d5bab2e3e16ef38d889fdd",
    "messageId": "aaa21450-ee83-4c4f-bb3c-24db22393905",
    "createdById": "65d5bab2e3e16ef38d889fdf",
    "createdAt": "2024-02-21T13:29:45.048Z",
    "__v": 0
  },
  {
    "_id": "65d6e3f7851cf750fbfe410b",
    "email": "penchalanki+dev1@gmail.com",
    "userFriendlyId": 116,
    "chatText": "sample test to check for violation errors in email test@gmaiEMAIL_ADDRESS",
    "issues": [
      {
        "category": "PERSONAL_IDENTIFIABLE_INFORMATION",
        "entitySeverity": "HIGH",
        "entityAction": "DISMISS",
        "startIndex": 51,
        "endIndex": 64,
        "entityType": "EMAIL_ADDRESS",
        "userAction": "REDACTED",
        "_id": "65d6e3f1851cf750fbfe4102"
      }
    ],
    "risk": "HIGH",
    "provider": "chatGPT",
    "orgId": "65d5bab2e3e16ef38d889fdd",
    "messageId": "aaa20f51-5787-445f-9644-e1f608da20b6",
    "createdById": "65d5bab2e3e16ef38d889fdf",
    "createdAt": "2024-02-21T13:29:45.048Z",
    "__v": 0
  }
]