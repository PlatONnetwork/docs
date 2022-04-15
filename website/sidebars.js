module.exports = {
  docs: [
    'index',
    {
      type: 'category',
      label: 'Basics',
      items: ['lat_introduced', 'staking_and_delegation', 'Network_Description']
    },
    {
      type: 'category',
      label: 'Advanced',
      items: [
        'PlatON_Overall_Solution',
        'Economic_Model',
        'PlatON_Solution',
        'PlatON_Governance_Solution',
        'Wasm_Operation_Principle'
      ]
    },
    {
      type: 'category',
      label: 'PlatON Node',
      items: [
        'PlatON_Validation_Introduce',
        'Become_PlatON_Main_Verification',
        {
          type: 'category',
          label: 'Tools for nodes',
          items: ['OnLine_MTool_Manual', 'OffLine_MTool_Manual', 'Command_Line_Tools']
        }
      ]
    },
    {
      type: 'category',
      label: 'Developers',
      items: [
        'PlatON_Overview_DevGuide',
        {
          type: 'category',
          label: 'Set up local environment',
          items: ['Join_Dev_Network', 'Build_Private_Chain']
        },
        {
          type: 'category',
          label: 'Smart contract',
          items: [
            {
              type: 'category',
              label: 'System contract',
              items : [
                'PlatON_system_contract',
                'PlatON_system_contract_api'
              ]
            },
            {
              type: 'category',
              label: 'Solidity contract',
              items: [
                'Solidity_Dev_Manual',
                'Solidity_Contract_Migrate',
                'Solidity_Contract_Dev_Costs',
                'Solidity_Contract_Best_Practice',
                'Solidity_Contract_Security_Dev_Guide',
                'Solidity_Inner_Contract'
              ]
            },
            {
              type: 'category',
              label: 'Wasm contract',
              items: ['Wasm_Dev_Manual', 'Wasm_Contract_Dev_Costs', 'Wasm_Contract_Best_Practice', 'Wasm_Contract_API']
            }
          ]
        },
        {
          type: 'category',
          label: 'References',
          items: ['Python_SDK', 'JS_SDK', 'Java_SDK', 'Go_SDK', 'NET_SDK', 'Json_Rpc','GraphQL_Server', 'Explorer_API', 'Samurai_API']
        },
        {
          type: 'category',
          label: 'PRC Token',
          items: ['PRC20_contract', 'PRC721_contract']
        }
      ]
    },
    {
      type: 'category',
      label: 'Data and analytics',
      items: ['PlatON_BlockChain_Browser', 'PlatEye']
    },
    {
      type: 'category',
      label: 'Tutorials',
      items: [
         'DApp_migrate', 
         'qianqian_prc721_tutorial', 
        {
          type: 'category',
          label: 'WASM Tutorials',
          items: ['WASM_Contract_1', 'WASM_Contract_2', 'WASM_Contract_3', 'WASM_Contract_4', 'WASM_Contract_5', 'WASM_Contract_6', 'WASM_Contract_7', 'WASM_Contract_8', 'WASM_Contract_9']
        },
        {
          type: 'category',
          label: 'WalletConnect',
          items: ['walletconnect_tutorial', 'DApp_integration_with_WalletConnect_for_ATON']
        },
		'get_vrf_random_number',
		'adapting_to_new_chainid'
        ]
    },
    {
      type: 'category',
      label: 'Wallet',
      items:['ATON-user-manual', 'Samurai_user_manual', 'Third_Party_Walle','Ledger-hardware-wallet', 'MetaMask']
    },
    'community',
  ]
};
