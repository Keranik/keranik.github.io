const GameData = {
  "metadataJs": {
    "version": "Update 3",
    "lastUpdated": "10/30/2025",
    "updateNotes": "Mod export: COIExtended-Core"
  },
  "machines": [
    {
      "id": "CargoShipDrydock",
      "name": "Cargo Ship Drydock",
      "description": "Constructs a dedicated Cargo Ship Drydock, enabling the assembly and deployment of cargo ships to efficiently transport large volumes of resources across the seas.",
      "image": "Assets/World/CargoDrydock.prefab",
      "recipes": [
        "CargoShipRecipe",
        "CargoShipRecipeT2"
      ],
      "electricityKw": 1000,
      "computingTFlops": 0,
      "workers": 18,
      "defaultPriority": 9,
      "maintenance": {
        "productId": "Product_Virtual_MaintenanceT1",
        "perMonth": 12,
        "maxPerMonth": 12,
        "extraBufferSeconds": 0,
        "initialBoostPercent": 0
      },
      "buffersMultiplier": 10,
      "emission": 0,
      "disableLogistics": true,
      "isWasteDisposal": false,
      "useAllRecipesOnUnlock": true,
      "hasSign": false,
      "layout": {
        "width": 35,
        "height": 86,
        "thickness": 9,
        "layoutString": "                                                                                                            \n                                                                                                            \n                                                                                                            \n~~~~~~~~~~~~                                                                                                \n~~~~~~~~~~~~~~~                                                                                             \n~~~~~~~~~~~~~~~~~~                                                                                          \n~~~~~~~~~~~~~~~~~~~~~                                                                                       \n~~~~~~~~~~~~~~~~~~~~~~~~                                                                                    \n~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                                 \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                              \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                           \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                        \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                     \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                  \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                               \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                            \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{9!{9!{9!{9!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{9!{9!{9!{9!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)\u003C@F\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{9!{9!{9!{9!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)\u003C#A\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)\u003C#B\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)\u003C#C\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{9!{9!{9!{9!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{9!{9!{9!{9!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)\u003C#D\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{9!{9!{9!{9!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                            \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                               \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                  \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                     \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                        \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                           \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                              \n~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                                 \n~~~~~~~~~~~~~~~~~~~~~~~~                                                                                    \n~~~~~~~~~~~~~~~~~~~~~                                                                                       \n~~~~~~~~~~~~~~~~~~                                                                                          \n~~~~~~~~~~~~~~~                                                                                             \n~~~~~~~~~~~~                                                                                                \n                                                                                                            \n                                                                                                            \n                                                                                                            ",
        "ports": [
          {
            "id": "F",
            "type": "input",
            "pos": {
              "x": 34,
              "y": 60,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "A",
            "type": "input",
            "pos": {
              "x": 34,
              "y": 37,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "B",
            "type": "input",
            "pos": {
              "x": 34,
              "y": 35,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "C",
            "type": "input",
            "pos": {
              "x": 34,
              "y": 32,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "D",
            "type": "input",
            "pos": {
              "x": 34,
              "y": 30,
              "z": 0
            },
            "dir": "\u002BX"
          }
        ]
      },
      "upgrades": {
        "tierNumber": 0,
        "nextTierId": "",
        "previousTierId": "",
        "canDowngrade": true,
        "canSkipUpgrade": true,
        "canMove": true,
        "skipFromReplace": false
      },
      "tags": [],
      "boostCost": 2,
      "buildTimePerProductSeconds": 0.200195313,
      "price": [
        {
          "productId": "Product_ConstructionParts",
          "quantity": 175
        },
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 200
        }
      ]
    },
    {
      "id": "Cannery",
      "name": "Cannery",
      "description": "Constructs a specialized Cannery that efficiently processes fresh fish and seals them in cans, providing a sustainable and storable food source to support your growing population.",
      "image": "Assets/Agriculture/Buildings/Cannery.prefab",
      "recipes": [
        "CannedFishFromAnchovies",
        "CannedFishFromSardines",
        "CannedFishFromRawFish",
        "RawFishFromMackerel",
        "RawFishFromCod",
        "RawFishFromTuna",
        "RawFishFromSwordfish",
        "CannedFruitProduction",
        "CannedVegetablesProduction"
      ],
      "electricityKw": 100,
      "computingTFlops": 0,
      "workers": 12,
      "defaultPriority": 9,
      "maintenance": {
        "productId": "Product_Virtual_MaintenanceT1",
        "perMonth": 3,
        "maxPerMonth": 3,
        "extraBufferSeconds": 0,
        "initialBoostPercent": 18000000
      },
      "buffersMultiplier": 1,
      "emission": 0,
      "disableLogistics": false,
      "isWasteDisposal": false,
      "useAllRecipesOnUnlock": false,
      "hasSign": false,
      "layout": {
        "width": 6,
        "height": 6,
        "thickness": 4,
        "layoutString": "   [3][3][3][3][3][3]   \nD#\u003C[4][4][4][4][4][4]\u003CA#\nE#\u003C[4][4][4][4][4][4]\u003CB#\nF~\u003C[4][4][4][4][4][4]\u003CC#\n   [3][3][3][3][3][3]   \nG@\u003C[3][3][3][3][3][3]   ",
        "ports": [
          {
            "id": "D",
            "type": "output",
            "pos": {
              "x": 0,
              "y": 4,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "A",
            "type": "input",
            "pos": {
              "x": 5,
              "y": 4,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "E",
            "type": "output",
            "pos": {
              "x": 0,
              "y": 3,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "B",
            "type": "input",
            "pos": {
              "x": 5,
              "y": 3,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "F",
            "type": "output",
            "pos": {
              "x": 0,
              "y": 2,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "C",
            "type": "input",
            "pos": {
              "x": 5,
              "y": 2,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "G",
            "type": "output",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-X"
          }
        ]
      },
      "upgrades": {
        "tierNumber": 0,
        "nextTierId": "",
        "previousTierId": "",
        "canDowngrade": true,
        "canSkipUpgrade": true,
        "canMove": true,
        "skipFromReplace": false
      },
      "tags": [],
      "boostCost": 0.25,
      "buildTimePerProductSeconds": 0.200195313,
      "price": [
        {
          "productId": "Product_ConstructionParts",
          "quantity": 35
        },
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 15
        }
      ]
    },
    {
      "id": "DistillationTowerS1T2",
      "name": "Distillation (stage I) II",
      "description": "Processes crude oil with super steam or high-pressure steam, splitting it into medium oil, heavy oil, and sour water. It handles large volumes quickly, feeding the next stages of refining. This tower jumpstarts advanced oil production for your growing factory.",
      "image": "Assets/Core/Machines/Distillery/DistillationT1.prefab",
      "recipes": [
        "CrudeOilRefiningT2COIE",
        "CrudeOilRefiningT2Sp"
      ],
      "electricityKw": 0,
      "computingTFlops": 0,
      "workers": 9,
      "defaultPriority": 9,
      "maintenance": {
        "productId": "Product_Virtual_MaintenanceT1",
        "perMonth": 5,
        "maxPerMonth": 5,
        "extraBufferSeconds": 0,
        "initialBoostPercent": 0
      },
      "buffersMultiplier": 1,
      "emission": 0,
      "disableLogistics": false,
      "isWasteDisposal": false,
      "useAllRecipesOnUnlock": false,
      "hasSign": false,
      "layout": {
        "width": 5,
        "height": 5,
        "thickness": 6,
        "layoutString": "   A@v         ^@Y   \n   [1][2][4][4][1]   \n   [1][6][6][6][1]   \nB@\u003E[2][6][6][6][6]\u003E@X\n   [2][6][6][6][1]   \n   [2][2][2][4][1]   \n               v@Z   ",
        "ports": [
          {
            "id": "A",
            "type": "input",
            "pos": {
              "x": 0,
              "y": 4,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "Y",
            "type": "output",
            "pos": {
              "x": 4,
              "y": 4,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "B",
            "type": "input",
            "pos": {
              "x": 0,
              "y": 2,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "X",
            "type": "output",
            "pos": {
              "x": 4,
              "y": 2,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "Z",
            "type": "output",
            "pos": {
              "x": 4,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          }
        ]
      },
      "upgrades": {
        "tierNumber": 0,
        "nextTierId": "",
        "previousTierId": "DistillationTowerT1",
        "canDowngrade": true,
        "canSkipUpgrade": true,
        "canMove": true,
        "skipFromReplace": false
      },
      "tags": [],
      "boostCost": 0.25,
      "buildTimePerProductSeconds": 0.200195313,
      "price": [
        {
          "productId": "Product_ConstructionParts2",
          "quantity": 75
        }
      ]
    },
    {
      "id": "DistillationTowerS2T2",
      "name": "Distillation (stage II) II",
      "description": "Uses medium oil and super steam or high-pressure steam to produce diesel and light oil. Its high-throughput design supports steady fuel supplies for vehicles and power plants. This tower drives mid-game refining with reliable output.",
      "image": "Assets/Core/Machines/Distillery/DistillationT2.prefab",
      "recipes": [
        "MediumOilRefiningT2",
        "MediumOilRefiningT2Sp"
      ],
      "electricityKw": 0,
      "computingTFlops": 0,
      "workers": 12,
      "defaultPriority": 9,
      "maintenance": {
        "productId": "Product_Virtual_MaintenanceT1",
        "perMonth": 6,
        "maxPerMonth": 6,
        "extraBufferSeconds": 0,
        "initialBoostPercent": 0
      },
      "buffersMultiplier": 1,
      "emission": 0,
      "disableLogistics": false,
      "isWasteDisposal": false,
      "useAllRecipesOnUnlock": false,
      "hasSign": false,
      "layout": {
        "width": 5,
        "height": 5,
        "thickness": 8,
        "layoutString": "   A@v               \n   [1][2][4][4]      \n   [1][6][6][6]      \nB@\u003E[2][6][8][8][8]\u003E@X\n   [2][6][8][8][7]   \n   [2][4][6][6][6]   \n               v@Z   ",
        "ports": [
          {
            "id": "A",
            "type": "input",
            "pos": {
              "x": 0,
              "y": 4,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "B",
            "type": "input",
            "pos": {
              "x": 0,
              "y": 2,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "X",
            "type": "output",
            "pos": {
              "x": 4,
              "y": 2,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "Z",
            "type": "output",
            "pos": {
              "x": 4,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          }
        ]
      },
      "upgrades": {
        "tierNumber": 0,
        "nextTierId": "",
        "previousTierId": "DistillationTowerT2",
        "canDowngrade": true,
        "canSkipUpgrade": true,
        "canMove": true,
        "skipFromReplace": false
      },
      "tags": [],
      "boostCost": 0.25,
      "buildTimePerProductSeconds": 0.200195313,
      "price": [
        {
          "productId": "Product_ConstructionParts2",
          "quantity": 105
        }
      ]
    },
    {
      "id": "DistillationTowerS3T2",
      "name": "Distillation (stage III) II",
      "description": "Refines light oil into naphtha and fuel gas or purifies titanium chloride into its pure form using super steam or high-pressure steam. It maximizes output for advanced fuel and material needs. This tower fuels late-game production with precision and efficiency.",
      "image": "Assets/Core/Machines/Distillery/DistillationT3.prefab",
      "recipes": [
        "LightOilRefiningT2",
        "LightOilRefiningT2Sp",
        "TitaniumPurificationT2",
        "TitaniumPurificationT2Sp"
      ],
      "electricityKw": 0,
      "computingTFlops": 0,
      "workers": 12,
      "defaultPriority": 9,
      "maintenance": {
        "productId": "Product_Virtual_MaintenanceT1",
        "perMonth": 9,
        "maxPerMonth": 9,
        "extraBufferSeconds": 0,
        "initialBoostPercent": 0
      },
      "buffersMultiplier": 1,
      "emission": 0,
      "disableLogistics": false,
      "isWasteDisposal": false,
      "useAllRecipesOnUnlock": false,
      "hasSign": false,
      "layout": {
        "width": 5,
        "height": 5,
        "thickness": 9,
        "layoutString": "   A@v               \n   [1][7][4][4]      \n   [1][8][8][8][3]   \nB@\u003E[2][8][9][9][9]\u003E@X\n   [2][8][9][9][9]   \n   [2][4][6][8][8]   \n               v@Z   ",
        "ports": [
          {
            "id": "A",
            "type": "input",
            "pos": {
              "x": 0,
              "y": 4,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "B",
            "type": "input",
            "pos": {
              "x": 0,
              "y": 2,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "X",
            "type": "output",
            "pos": {
              "x": 4,
              "y": 2,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "Z",
            "type": "output",
            "pos": {
              "x": 4,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          }
        ]
      },
      "upgrades": {
        "tierNumber": 0,
        "nextTierId": "",
        "previousTierId": "DistillationTowerT3",
        "canDowngrade": true,
        "canSkipUpgrade": true,
        "canMove": true,
        "skipFromReplace": false
      },
      "tags": [],
      "boostCost": 0.25,
      "buildTimePerProductSeconds": 0.200195313,
      "price": [
        {
          "productId": "Product_ConstructionParts3",
          "quantity": 105
        }
      ]
    },
    {
      "id": "SynfuelRefinery",
      "name": "Synfuel Refinery",
      "description": "A cutting-edge facility that transforms light oil or fuel gas, combined with hydrogen and steam, into powerful synfuel liquid or gas. It produces high-energy synfuel alongside byproducts like sour water or carbon dioxide, demanding significant electricity to operate. This advanced machine unlocks superior fuel options, revolutionizing late-game energy production.",
      "image": "Assets/Machines/SynfuelPlant.prefab",
      "recipes": [
        "SynfuelLiquidRefining",
        "SynfuelGasRefining"
      ],
      "electricityKw": 800,
      "computingTFlops": 0,
      "workers": 18,
      "defaultPriority": 9,
      "maintenance": {
        "productId": "Product_Virtual_MaintenanceT3",
        "perMonth": 5,
        "maxPerMonth": 5,
        "extraBufferSeconds": 0,
        "initialBoostPercent": 0
      },
      "buffersMultiplier": 1,
      "emission": 0,
      "disableLogistics": false,
      "isWasteDisposal": false,
      "useAllRecipesOnUnlock": false,
      "hasSign": false,
      "layout": {
        "width": 7,
        "height": 7,
        "thickness": 5,
        "layoutString": "   [5][5][5][5][5][5][5]   \n   [5][5][5][5][5][5][5]\u003EX@\n@A\u003E[5][5][5][5][5][5][5]\u003EY@\n@B\u003E[5][5][5][5][5][5][5]\u003EZ@\n@C\u003E[5][5][5][5][5][5][5]   \n   [5][5][5][5][5][5][5]   \n   [5][5][5][5][5][5]      ",
        "ports": [
          {
            "id": "X",
            "type": "output",
            "pos": {
              "x": 6,
              "y": 5,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "A",
            "type": "input",
            "pos": {
              "x": 0,
              "y": 4,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "Y",
            "type": "output",
            "pos": {
              "x": 6,
              "y": 4,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "B",
            "type": "input",
            "pos": {
              "x": 0,
              "y": 3,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "Z",
            "type": "output",
            "pos": {
              "x": 6,
              "y": 3,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "C",
            "type": "input",
            "pos": {
              "x": 0,
              "y": 2,
              "z": 0
            },
            "dir": "-X"
          }
        ]
      },
      "upgrades": {
        "tierNumber": 0,
        "nextTierId": "",
        "previousTierId": "",
        "canDowngrade": true,
        "canSkipUpgrade": true,
        "canMove": true,
        "skipFromReplace": false
      },
      "tags": [],
      "boostCost": 0.25,
      "buildTimePerProductSeconds": 0.200195313,
      "price": [
        {
          "productId": "Product_ConstructionParts4",
          "quantity": 125
        }
      ]
    },
    {
      "id": "HighPressureBoiler",
      "name": "High Pressure Boiler (gas)",
      "description": "The High Pressure Boiler burns heavy oil, medium oil, light oil, naphtha, ethanol, fuel gas, or synfuel (liquid or gas) with water to produce super steam. It generates high-pressure steam with minimal exhaust or carbon dioxide, powering advanced distillation and industrial processes.",
      "image": "Assets/Machines/HighPressureBoiler.prefab",
      "recipes": [
        "HPSteamGenerationHeavyOil",
        "HPSteamGenerationMediumOil",
        "HPSteamGenerationLightOil",
        "HPSteamGenerationNaphtha",
        "HPSteamGenerationEthanol",
        "HPSteamGenerationFuelGas",
        "HPSteamGenerationSynfluidSuper",
        "HPSteamGenerationSyngasSuper"
      ],
      "electricityKw": 0,
      "computingTFlops": 0,
      "workers": 3,
      "defaultPriority": 9,
      "maintenance": {
        "productId": "Product_Virtual_MaintenanceT3",
        "perMonth": 2,
        "maxPerMonth": 2,
        "extraBufferSeconds": 0,
        "initialBoostPercent": 0
      },
      "buffersMultiplier": 1,
      "emission": 3,
      "disableLogistics": true,
      "isWasteDisposal": false,
      "useAllRecipesOnUnlock": true,
      "hasSign": false,
      "layout": {
        "width": 5,
        "height": 4,
        "thickness": 3,
        "layoutString": "   [2][2][2][2][2]   \nB@\u003E[3][3][3][3][3]   \nA@\u003E[3][3][3][3][3]\u003E@X\n   [3][3][3][3][3]   \n         v@Y         ",
        "ports": [
          {
            "id": "B",
            "type": "input",
            "pos": {
              "x": 0,
              "y": 2,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "A",
            "type": "input",
            "pos": {
              "x": 0,
              "y": 1,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "X",
            "type": "output",
            "pos": {
              "x": 4,
              "y": 1,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "Y",
            "type": "output",
            "pos": {
              "x": 2,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          }
        ]
      },
      "upgrades": {
        "tierNumber": 0,
        "nextTierId": "",
        "previousTierId": "",
        "canDowngrade": true,
        "canSkipUpgrade": true,
        "canMove": true,
        "skipFromReplace": false
      },
      "tags": [],
      "boostCost": 0.25,
      "buildTimePerProductSeconds": 0.200195313,
      "price": [
        {
          "productId": "Product_ConstructionParts4",
          "quantity": 25
        }
      ]
    },
    {
      "id": "HydroCrackerT2",
      "name": "Cracking unit II",
      "description": "Cracking Unit II converts heavy oil, medium oil, naphtha, diesel, or fuel gas into lighter, more versatile fuels like diesel, naphtha, or light oil using hydrogen or steam. It processes inputs rapidly, producing valuable byproducts like fuel gas or water to balance resource demands.",
      "image": "Assets/Base/Machines/Oil/HydroCracker.prefab",
      "recipes": [
        "HeavyOilCrackingT2",
        "HeavyOilCrackingToNaphthaT2",
        "NaphthaReformingT2",
        "DieselReformingT2",
        "DieselReformingT2Sp",
        "NaphthaReformingToGasT2",
        "NaphthaReformingToGasT2Sp",
        "FuelGasReformingT2",
        "HeavyOilToMediumCrackingT2",
        "MediumOilToLightCrackingT2"
      ],
      "electricityKw": 240,
      "computingTFlops": 0,
      "workers": 18,
      "defaultPriority": 9,
      "maintenance": {
        "productId": "Product_Virtual_MaintenanceT1",
        "perMonth": 9,
        "maxPerMonth": 9,
        "extraBufferSeconds": 0,
        "initialBoostPercent": 0
      },
      "buffersMultiplier": 1,
      "emission": 0,
      "disableLogistics": false,
      "isWasteDisposal": false,
      "useAllRecipesOnUnlock": false,
      "hasSign": false,
      "layout": {
        "width": 9,
        "height": 6,
        "thickness": 8,
        "layoutString": "   [2][5][5][5][5][6][6][4][2]   \n   [2][8][8][8][8][6][7][7][7]   \nA@\u003E[2][8][8][8][8][8][7][7][7]\u003E@X\n   [2][2][8][8][8][6][7][7][7]   \n         [1][6][3][3][3][3]      \n         [1][2][2][2][2][2]      \n         B@^         v@Y         ",
        "ports": [
          {
            "id": "A",
            "type": "input",
            "pos": {
              "x": 0,
              "y": 3,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "X",
            "type": "output",
            "pos": {
              "x": 8,
              "y": 3,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "B",
            "type": "input",
            "pos": {
              "x": 2,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          },
          {
            "id": "Y",
            "type": "output",
            "pos": {
              "x": 6,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          }
        ]
      },
      "upgrades": {
        "tierNumber": 0,
        "nextTierId": "",
        "previousTierId": "HydroCrackerT1",
        "canDowngrade": true,
        "canSkipUpgrade": true,
        "canMove": true,
        "skipFromReplace": false
      },
      "tags": [],
      "boostCost": 0.25,
      "buildTimePerProductSeconds": 0.200195313,
      "price": [
        {
          "productId": "Product_ConstructionParts3",
          "quantity": 50
        }
      ]
    }
  ],
  "products": [
    {
      "id": "Anchovies",
      "name": "Anchovies",
      "description": "",
      "type": "countable",
      "maxStack": 3,
      "storable": true,
      "discardable": false,
      "isWaste": false,
      "doNotNormalize": false,
      "pinToHome": false,
      "recyclable": false,
      "trackSources": true,
      "radioactivity": 0,
      "excludeFromStats": false,
      "formatterType": "ProductCount",
      "source": {
        "productId": "Product_Biomass",
        "quantity": 1
      },
      "graphics": {
        "prefabPath": "Assets/Agriculture/Products/Anchovies.prefab",
        "customIconPath": "Assets/Agriculture/Icons/Anchovies.svg",
        "color": {
          "r": 0,
          "g": 0,
          "b": 0,
          "a": 255
        },
        "stackingMode": "Stacked",
        "stackingOffsets": [],
        "pileMaterial": "",
        "roughPiles": false,
        "materialPath": ""
      },
      "dumpOnTerrain": false,
      "terrainMaterialId": "",
      "tags": [],
      "fertilizer": null
    },
    {
      "id": "Sardines",
      "name": "Sardines",
      "description": "",
      "type": "countable",
      "maxStack": 3,
      "storable": true,
      "discardable": false,
      "isWaste": false,
      "doNotNormalize": false,
      "pinToHome": false,
      "recyclable": false,
      "trackSources": true,
      "radioactivity": 0,
      "excludeFromStats": false,
      "formatterType": "ProductCount",
      "source": {
        "productId": "Product_Biomass",
        "quantity": 1
      },
      "graphics": {
        "prefabPath": "Assets/Agriculture/Products/Sardines.prefab",
        "customIconPath": "Assets/Agriculture/Icons/Sardines.svg",
        "color": {
          "r": 0,
          "g": 0,
          "b": 0,
          "a": 255
        },
        "stackingMode": "Stacked",
        "stackingOffsets": [],
        "pileMaterial": "",
        "roughPiles": false,
        "materialPath": ""
      },
      "dumpOnTerrain": false,
      "terrainMaterialId": "",
      "tags": [],
      "fertilizer": null
    },
    {
      "id": "Mackerel",
      "name": "Mackerel",
      "description": "",
      "type": "countable",
      "maxStack": 3,
      "storable": true,
      "discardable": false,
      "isWaste": false,
      "doNotNormalize": false,
      "pinToHome": false,
      "recyclable": false,
      "trackSources": true,
      "radioactivity": 0,
      "excludeFromStats": false,
      "formatterType": "ProductCount",
      "source": {
        "productId": "Product_Biomass",
        "quantity": 1
      },
      "graphics": {
        "prefabPath": "Assets/Agriculture/Products/Mackerel.prefab",
        "customIconPath": "Assets/Agriculture/Icons/Mackerel.svg",
        "color": {
          "r": 0,
          "g": 0,
          "b": 0,
          "a": 255
        },
        "stackingMode": "Stacked",
        "stackingOffsets": [],
        "pileMaterial": "",
        "roughPiles": false,
        "materialPath": ""
      },
      "dumpOnTerrain": false,
      "terrainMaterialId": "",
      "tags": [],
      "fertilizer": null
    },
    {
      "id": "Cod",
      "name": "Cod",
      "description": "",
      "type": "countable",
      "maxStack": 3,
      "storable": true,
      "discardable": false,
      "isWaste": false,
      "doNotNormalize": false,
      "pinToHome": false,
      "recyclable": false,
      "trackSources": true,
      "radioactivity": 0,
      "excludeFromStats": false,
      "formatterType": "ProductCount",
      "source": {
        "productId": "Product_Biomass",
        "quantity": 1
      },
      "graphics": {
        "prefabPath": "Assets/Agriculture/Products/Cod.prefab",
        "customIconPath": "Assets/Agriculture/Icons/Cod.svg",
        "color": {
          "r": 0,
          "g": 0,
          "b": 0,
          "a": 255
        },
        "stackingMode": "Stacked",
        "stackingOffsets": [],
        "pileMaterial": "",
        "roughPiles": false,
        "materialPath": ""
      },
      "dumpOnTerrain": false,
      "terrainMaterialId": "",
      "tags": [],
      "fertilizer": null
    },
    {
      "id": "Tuna",
      "name": "Tuna",
      "description": "",
      "type": "countable",
      "maxStack": 3,
      "storable": true,
      "discardable": false,
      "isWaste": false,
      "doNotNormalize": false,
      "pinToHome": false,
      "recyclable": false,
      "trackSources": true,
      "radioactivity": 0,
      "excludeFromStats": false,
      "formatterType": "ProductCount",
      "source": {
        "productId": "Product_Biomass",
        "quantity": 1
      },
      "graphics": {
        "prefabPath": "Assets/Agriculture/Products/Tuna.prefab",
        "customIconPath": "Assets/Agriculture/Icons/Tuna.svg",
        "color": {
          "r": 0,
          "g": 0,
          "b": 0,
          "a": 255
        },
        "stackingMode": "Stacked",
        "stackingOffsets": [],
        "pileMaterial": "",
        "roughPiles": false,
        "materialPath": ""
      },
      "dumpOnTerrain": false,
      "terrainMaterialId": "",
      "tags": [],
      "fertilizer": null
    },
    {
      "id": "Swordfish",
      "name": "Swordfish",
      "description": "",
      "type": "countable",
      "maxStack": 3,
      "storable": true,
      "discardable": false,
      "isWaste": false,
      "doNotNormalize": false,
      "pinToHome": false,
      "recyclable": false,
      "trackSources": true,
      "radioactivity": 0,
      "excludeFromStats": false,
      "formatterType": "ProductCount",
      "source": {
        "productId": "Product_Biomass",
        "quantity": 1
      },
      "graphics": {
        "prefabPath": "Assets/Agriculture/Products/Swordfish.prefab",
        "customIconPath": "Assets/Agriculture/Icons/Swordfish.svg",
        "color": {
          "r": 0,
          "g": 0,
          "b": 0,
          "a": 255
        },
        "stackingMode": "Stacked",
        "stackingOffsets": [],
        "pileMaterial": "",
        "roughPiles": false,
        "materialPath": ""
      },
      "dumpOnTerrain": false,
      "terrainMaterialId": "",
      "tags": [],
      "fertilizer": null
    },
    {
      "id": "FishOil",
      "name": "Fish oil",
      "description": "",
      "type": "fluid",
      "maxStack": 3,
      "storable": true,
      "discardable": true,
      "isWaste": false,
      "doNotNormalize": false,
      "pinToHome": false,
      "recyclable": false,
      "trackSources": false,
      "radioactivity": 0,
      "excludeFromStats": false,
      "formatterType": "ProductCount",
      "source": null,
      "graphics": {
        "prefabPath": "",
        "customIconPath": "Assets/Agriculture/Icons/FishOil.svg",
        "color": {
          "r": 255,
          "g": 215,
          "b": 0,
          "a": 255
        },
        "stackingMode": "Auto",
        "stackingOffsets": [],
        "pileMaterial": "",
        "roughPiles": false,
        "materialPath": ""
      },
      "dumpOnTerrain": false,
      "terrainMaterialId": "",
      "tags": [],
      "fertilizer": null
    },
    {
      "id": "SynfuelLiquid",
      "name": "Synfuel",
      "description": "",
      "type": "fluid",
      "maxStack": 3,
      "storable": true,
      "discardable": true,
      "isWaste": false,
      "doNotNormalize": false,
      "pinToHome": false,
      "recyclable": false,
      "trackSources": false,
      "radioactivity": 0,
      "excludeFromStats": false,
      "formatterType": "ProductCount",
      "source": null,
      "graphics": {
        "prefabPath": "",
        "customIconPath": "Assets/Icons/SynfuelLiquid.png",
        "color": {
          "r": 187,
          "g": 187,
          "b": 0,
          "a": 255
        },
        "stackingMode": "Auto",
        "stackingOffsets": [],
        "pileMaterial": "",
        "roughPiles": false,
        "materialPath": ""
      },
      "dumpOnTerrain": false,
      "terrainMaterialId": "",
      "tags": [],
      "fertilizer": null
    },
    {
      "id": "SynfuelGas",
      "name": "Synfuel (gas)",
      "description": "",
      "type": "fluid",
      "maxStack": 3,
      "storable": true,
      "discardable": true,
      "isWaste": false,
      "doNotNormalize": false,
      "pinToHome": false,
      "recyclable": false,
      "trackSources": false,
      "radioactivity": 0,
      "excludeFromStats": false,
      "formatterType": "ProductCount",
      "source": null,
      "graphics": {
        "prefabPath": "",
        "customIconPath": "Assets/Icons/SynfuelGas.png",
        "color": {
          "r": 187,
          "g": 187,
          "b": 0,
          "a": 255
        },
        "stackingMode": "Auto",
        "stackingOffsets": [],
        "pileMaterial": "",
        "roughPiles": false,
        "materialPath": ""
      },
      "dumpOnTerrain": false,
      "terrainMaterialId": "",
      "tags": [],
      "fertilizer": null
    },
    {
      "id": "FishScales",
      "name": "Fish scales",
      "description": "",
      "type": "loose",
      "maxStack": 5,
      "storable": true,
      "discardable": false,
      "isWaste": false,
      "doNotNormalize": false,
      "pinToHome": false,
      "recyclable": false,
      "trackSources": true,
      "radioactivity": 0,
      "excludeFromStats": false,
      "formatterType": "ProductCount",
      "source": null,
      "graphics": {
        "prefabPath": "Assets/Base/Transports/ConveyorLoose/PileSmooth.prefab",
        "customIconPath": "Assets/Agriculture/Icons/FishScales.svg",
        "color": {
          "r": 0,
          "g": 0,
          "b": 0,
          "a": 255
        },
        "stackingMode": "Auto",
        "stackingOffsets": [],
        "pileMaterial": "Assets/Agriculture/Products/FishScales.mat",
        "roughPiles": false,
        "materialPath": ""
      },
      "dumpOnTerrain": false,
      "terrainMaterialId": "",
      "tags": [],
      "fertilizer": null
    },
    {
      "id": "FoodCanEmpty",
      "name": "Food can (empty)",
      "description": "",
      "type": "countable",
      "maxStack": 3,
      "storable": true,
      "discardable": false,
      "isWaste": false,
      "doNotNormalize": false,
      "pinToHome": false,
      "recyclable": false,
      "trackSources": true,
      "radioactivity": 0,
      "excludeFromStats": false,
      "formatterType": "ProductCount",
      "source": null,
      "graphics": {
        "prefabPath": "Assets/Agriculture/Products/FoodCanEmpty.prefab",
        "customIconPath": "Assets/Agriculture/Icons/FoodCanEmpty.svg",
        "color": {
          "r": 0,
          "g": 0,
          "b": 0,
          "a": 255
        },
        "stackingMode": "Stacked",
        "stackingOffsets": [],
        "pileMaterial": "",
        "roughPiles": false,
        "materialPath": ""
      },
      "dumpOnTerrain": false,
      "terrainMaterialId": "",
      "tags": [],
      "fertilizer": null
    },
    {
      "id": "FoodCanFish",
      "name": "Food can (fish)",
      "description": "",
      "type": "countable",
      "maxStack": 3,
      "storable": true,
      "discardable": false,
      "isWaste": false,
      "doNotNormalize": false,
      "pinToHome": false,
      "recyclable": false,
      "trackSources": true,
      "radioactivity": 0,
      "excludeFromStats": false,
      "formatterType": "ProductCount",
      "source": null,
      "graphics": {
        "prefabPath": "Assets/Agriculture/Products/FoodCanFish.prefab",
        "customIconPath": "Assets/Agriculture/Icons/FoodCanFish.svg",
        "color": {
          "r": 0,
          "g": 0,
          "b": 0,
          "a": 255
        },
        "stackingMode": "Stacked",
        "stackingOffsets": [],
        "pileMaterial": "",
        "roughPiles": false,
        "materialPath": ""
      },
      "dumpOnTerrain": false,
      "terrainMaterialId": "",
      "tags": [],
      "fertilizer": null
    },
    {
      "id": "FoodCanFruit",
      "name": "Food can (fruit)",
      "description": "",
      "type": "countable",
      "maxStack": 3,
      "storable": true,
      "discardable": false,
      "isWaste": false,
      "doNotNormalize": false,
      "pinToHome": false,
      "recyclable": false,
      "trackSources": true,
      "radioactivity": 0,
      "excludeFromStats": false,
      "formatterType": "ProductCount",
      "source": null,
      "graphics": {
        "prefabPath": "Assets/Agriculture/Products/FoodCanFruit.prefab",
        "customIconPath": "Assets/Agriculture/Icons/FoodCanFruit.svg",
        "color": {
          "r": 0,
          "g": 0,
          "b": 0,
          "a": 255
        },
        "stackingMode": "Stacked",
        "stackingOffsets": [],
        "pileMaterial": "",
        "roughPiles": false,
        "materialPath": ""
      },
      "dumpOnTerrain": false,
      "terrainMaterialId": "",
      "tags": [],
      "fertilizer": null
    },
    {
      "id": "FoodCanVegetables",
      "name": "Food can (vegetables)",
      "description": "",
      "type": "countable",
      "maxStack": 3,
      "storable": true,
      "discardable": false,
      "isWaste": false,
      "doNotNormalize": false,
      "pinToHome": false,
      "recyclable": false,
      "trackSources": true,
      "radioactivity": 0,
      "excludeFromStats": false,
      "formatterType": "ProductCount",
      "source": null,
      "graphics": {
        "prefabPath": "Assets/Agriculture/Products/FoodCanVegetables.prefab",
        "customIconPath": "Assets/Agriculture/Icons/FoodCanVegetables.svg",
        "color": {
          "r": 0,
          "g": 0,
          "b": 0,
          "a": 255
        },
        "stackingMode": "Stacked",
        "stackingOffsets": [],
        "pileMaterial": "",
        "roughPiles": false,
        "materialPath": ""
      },
      "dumpOnTerrain": false,
      "terrainMaterialId": "",
      "tags": [],
      "fertilizer": null
    },
    {
      "id": "FoodCanPack",
      "name": "Food pack (canned)",
      "description": "",
      "type": "countable",
      "maxStack": 3,
      "storable": true,
      "discardable": false,
      "isWaste": false,
      "doNotNormalize": false,
      "pinToHome": false,
      "recyclable": false,
      "trackSources": true,
      "radioactivity": 0,
      "excludeFromStats": false,
      "formatterType": "ProductCount",
      "source": null,
      "graphics": {
        "prefabPath": "Assets/Agriculture/Products/FoodCanPack.prefab",
        "customIconPath": "Assets/Agriculture/Icons/FoodCanPack.svg",
        "color": {
          "r": 0,
          "g": 0,
          "b": 0,
          "a": 255
        },
        "stackingMode": "Stacked",
        "stackingOffsets": [],
        "pileMaterial": "",
        "roughPiles": false,
        "materialPath": ""
      },
      "dumpOnTerrain": false,
      "terrainMaterialId": "",
      "tags": [],
      "fertilizer": null
    },
    {
      "id": "RawFish",
      "name": "Fish (raw)",
      "description": "",
      "type": "countable",
      "maxStack": 3,
      "storable": true,
      "discardable": false,
      "isWaste": false,
      "doNotNormalize": false,
      "pinToHome": false,
      "recyclable": false,
      "trackSources": true,
      "radioactivity": 0,
      "excludeFromStats": false,
      "formatterType": "ProductCount",
      "source": null,
      "graphics": {
        "prefabPath": "Assets/Agriculture/Products/RawFish.prefab",
        "customIconPath": "Assets/Agriculture/Icons/RawFish.svg",
        "color": {
          "r": 0,
          "g": 0,
          "b": 0,
          "a": 255
        },
        "stackingMode": "Stacked",
        "stackingOffsets": [],
        "pileMaterial": "",
        "roughPiles": false,
        "materialPath": ""
      },
      "dumpOnTerrain": false,
      "terrainMaterialId": "",
      "tags": [],
      "fertilizer": null
    },
    {
      "id": "Product_Virtual_CargoShip",
      "name": "Cargo ship",
      "description": "The amount of cargo ships that have been built but not deployed.",
      "type": "virtual",
      "maxStack": 1,
      "storable": false,
      "discardable": true,
      "isWaste": false,
      "doNotNormalize": false,
      "pinToHome": false,
      "recyclable": false,
      "trackSources": false,
      "radioactivity": 0,
      "excludeFromStats": true,
      "formatterType": "ProductCount",
      "source": null,
      "graphics": {
        "prefabPath": "",
        "customIconPath": "Assets/Unity/UserInterface/WorldMap/CargoShipStoryIcon256.png",
        "color": {
          "r": 0,
          "g": 0,
          "b": 0,
          "a": 255
        },
        "stackingMode": "Auto",
        "stackingOffsets": [],
        "pileMaterial": "",
        "roughPiles": false,
        "materialPath": ""
      },
      "dumpOnTerrain": false,
      "terrainMaterialId": "",
      "tags": [],
      "fertilizer": null
    }
  ],
  "recipes": [
    {
      "id": "CargoShipRecipe",
      "name": "Build Cargo Ship",
      "description": "",
      "durationSeconds": 1800,
      "powerMultiplier": 200,
      "destroyReason": "General",
      "minUtilizationPercent": 5,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Iron",
          "quantity": 500,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 34,
                "y": 37,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_ConstructionParts",
          "quantity": 200,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 34,
                "y": 35,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_MechanicalParts",
          "quantity": 150,
          "ports": [
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 34,
                "y": 32,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Electronics",
          "quantity": 50,
          "ports": [
            {
              "id": "D",
              "type": "input",
              "pos": {
                "x": 34,
                "y": 30,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_Virtual_CargoShip",
          "quantity": 1,
          "ports": [],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Iron",
          "quantity": 500,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 34,
                "y": 37,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_ConstructionParts",
          "quantity": 200,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 34,
                "y": 35,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_MechanicalParts",
          "quantity": 150,
          "ports": [
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 34,
                "y": 32,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Electronics",
          "quantity": 50,
          "ports": [
            {
              "id": "D",
              "type": "input",
              "pos": {
                "x": 34,
                "y": 30,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_Virtual_CargoShip",
          "quantity": 1,
          "ports": [],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "CargoShipRecipeT2",
      "name": "Build Cargo Ship T2",
      "description": "",
      "durationSeconds": 900,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 5,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Steel",
          "quantity": 250,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 34,
                "y": 37,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_ConstructionParts2",
          "quantity": 100,
          "ports": [
            {
              "id": "D",
              "type": "input",
              "pos": {
                "x": 34,
                "y": 30,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_MechanicalParts",
          "quantity": 150,
          "ports": [
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 34,
                "y": 32,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Electronics2",
          "quantity": 25,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 34,
                "y": 35,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_Virtual_CargoShip",
          "quantity": 1,
          "ports": [],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Steel",
          "quantity": 250,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 34,
                "y": 37,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_ConstructionParts2",
          "quantity": 100,
          "ports": [
            {
              "id": "D",
              "type": "input",
              "pos": {
                "x": 34,
                "y": 30,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_MechanicalParts",
          "quantity": 150,
          "ports": [
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 34,
                "y": 32,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Electronics2",
          "quantity": 25,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 34,
                "y": 35,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_Virtual_CargoShip",
          "quantity": 1,
          "ports": [],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "CannedFishFromAnchovies",
      "name": "Fish canning from Anchovies",
      "description": "",
      "durationSeconds": 15,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Anchovies",
          "quantity": 12,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 5,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FoodCanEmpty",
          "quantity": 1,
          "ports": [
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "FoodCanFish",
          "quantity": 6,
          "ports": [
            {
              "id": "D",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 4,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Anchovies",
          "quantity": 12,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 5,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FoodCanEmpty",
          "quantity": 1,
          "ports": [
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "FoodCanFish",
          "quantity": 6,
          "ports": [
            {
              "id": "D",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 4,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "CannedFishFromSardines",
      "name": "Fish canning from Sardines",
      "description": "",
      "durationSeconds": 15,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Sardines",
          "quantity": 7,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 5,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FoodCanEmpty",
          "quantity": 1,
          "ports": [
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "FoodCanFish",
          "quantity": 6,
          "ports": [
            {
              "id": "D",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 4,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Sardines",
          "quantity": 7,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 5,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FoodCanEmpty",
          "quantity": 1,
          "ports": [
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "FoodCanFish",
          "quantity": 6,
          "ports": [
            {
              "id": "D",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 4,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "CannedFishFromRawFish",
      "name": "Fish canning from Raw Fish",
      "description": "",
      "durationSeconds": 20,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "RawFish",
          "quantity": 10,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 5,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FoodCanEmpty",
          "quantity": 3,
          "ports": [
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "FoodCanFish",
          "quantity": 18,
          "ports": [
            {
              "id": "D",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 4,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "RawFish",
          "quantity": 10,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 5,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FoodCanEmpty",
          "quantity": 3,
          "ports": [
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "FoodCanFish",
          "quantity": 18,
          "ports": [
            {
              "id": "D",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 4,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "RawFishFromMackerel",
      "name": "Raw Fish from Mackerel",
      "description": "",
      "durationSeconds": 15,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Mackerel",
          "quantity": 10,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 5,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "RawFish",
          "quantity": 18,
          "ports": [
            {
              "id": "E",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FishScales",
          "quantity": 4,
          "ports": [
            {
              "id": "F",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Mackerel",
          "quantity": 10,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 5,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "RawFish",
          "quantity": 18,
          "ports": [
            {
              "id": "E",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FishScales",
          "quantity": 4,
          "ports": [
            {
              "id": "F",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "RawFishFromCod",
      "name": "Raw Fish from Cod",
      "description": "",
      "durationSeconds": 15,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Cod",
          "quantity": 5,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 5,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "RawFish",
          "quantity": 13,
          "ports": [
            {
              "id": "E",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FishScales",
          "quantity": 5,
          "ports": [
            {
              "id": "F",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Cod",
          "quantity": 5,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 5,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "RawFish",
          "quantity": 13,
          "ports": [
            {
              "id": "E",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FishScales",
          "quantity": 5,
          "ports": [
            {
              "id": "F",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "RawFishFromTuna",
      "name": "Raw Fish from Tuna",
      "description": "",
      "durationSeconds": 15,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Tuna",
          "quantity": 2,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 5,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "RawFish",
          "quantity": 10,
          "ports": [
            {
              "id": "E",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FishScales",
          "quantity": 6,
          "ports": [
            {
              "id": "F",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FishOil",
          "quantity": 6,
          "ports": [
            {
              "id": "G",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 0,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Tuna",
          "quantity": 2,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 5,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "RawFish",
          "quantity": 10,
          "ports": [
            {
              "id": "E",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FishScales",
          "quantity": 6,
          "ports": [
            {
              "id": "F",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FishOil",
          "quantity": 6,
          "ports": [
            {
              "id": "G",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 0,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "RawFishFromSwordfish",
      "name": "Raw Fish from Swordfish",
      "description": "",
      "durationSeconds": 15,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Swordfish",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 5,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "RawFish",
          "quantity": 8,
          "ports": [
            {
              "id": "E",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FishScales",
          "quantity": 8,
          "ports": [
            {
              "id": "F",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FishOil",
          "quantity": 8,
          "ports": [
            {
              "id": "G",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 0,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Swordfish",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 5,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "RawFish",
          "quantity": 8,
          "ports": [
            {
              "id": "E",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FishScales",
          "quantity": 8,
          "ports": [
            {
              "id": "F",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FishOil",
          "quantity": 8,
          "ports": [
            {
              "id": "G",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 0,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "CannedFruitProduction",
      "name": "Fruit canning",
      "description": "",
      "durationSeconds": 30,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Fruit",
          "quantity": 10,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 5,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FoodCanEmpty",
          "quantity": 3,
          "ports": [
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "FoodCanFruit",
          "quantity": 18,
          "ports": [
            {
              "id": "E",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Fruit",
          "quantity": 10,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 5,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FoodCanEmpty",
          "quantity": 3,
          "ports": [
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "FoodCanFruit",
          "quantity": 18,
          "ports": [
            {
              "id": "E",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "CannedVegetablesProduction",
      "name": "Vegetable canning",
      "description": "",
      "durationSeconds": 30,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Vegetables",
          "quantity": 10,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 5,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FoodCanEmpty",
          "quantity": 3,
          "ports": [
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "FoodCanVegetables",
          "quantity": 18,
          "ports": [
            {
              "id": "E",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Vegetables",
          "quantity": 10,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 5,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FoodCanEmpty",
          "quantity": 3,
          "ports": [
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "FoodCanVegetables",
          "quantity": 18,
          "ports": [
            {
              "id": "E",
              "type": "output",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "EmptyCanProductionT1Iron",
      "name": "Empty can production T1 (iron)",
      "description": "",
      "durationSeconds": 40,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Iron",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "FoodCanEmpty",
          "quantity": 12,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Iron",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "FoodCanEmpty",
          "quantity": 12,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "EmptyCanProductionT2Iron",
      "name": "Empty can production T2 (iron)",
      "description": "",
      "durationSeconds": 40,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Iron",
          "quantity": 2,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "FoodCanEmpty",
          "quantity": 24,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Iron",
          "quantity": 2,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "FoodCanEmpty",
          "quantity": 24,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "EmptyCanProductionT3Iron",
      "name": "Empty can production T3 (iron)",
      "description": "",
      "durationSeconds": 40,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Iron",
          "quantity": 3,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "FoodCanEmpty",
          "quantity": 36,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Iron",
          "quantity": 3,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "FoodCanEmpty",
          "quantity": 36,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "EmptyCanProductionT4Iron",
      "name": "Empty can production T4 (iron)",
      "description": "",
      "durationSeconds": 40,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Iron",
          "quantity": 4,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "FoodCanEmpty",
          "quantity": 48,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Iron",
          "quantity": 4,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "FoodCanEmpty",
          "quantity": 48,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "EmptyCanProductionT5Iron",
      "name": "Empty can production T5 (iron)",
      "description": "",
      "durationSeconds": 40,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Iron",
          "quantity": 5,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "FoodCanEmpty",
          "quantity": 60,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Iron",
          "quantity": 5,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "FoodCanEmpty",
          "quantity": 60,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "EmptyCanProductionT3Steel",
      "name": "Empty can production T3 (steel)",
      "description": "",
      "durationSeconds": 30,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Steel",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "FoodCanEmpty",
          "quantity": 24,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Steel",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "FoodCanEmpty",
          "quantity": 24,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "EmptyCanProductionT4Steel",
      "name": "Empty can production T4 (steel)",
      "description": "",
      "durationSeconds": 30,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Steel",
          "quantity": 2,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "FoodCanEmpty",
          "quantity": 48,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Steel",
          "quantity": 2,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "FoodCanEmpty",
          "quantity": 48,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "EmptyCanProductionT5Steel",
      "name": "Empty can production T5 (steel)",
      "description": "",
      "durationSeconds": 30,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Steel",
          "quantity": 3,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "FoodCanEmpty",
          "quantity": 72,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Steel",
          "quantity": 3,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "FoodCanEmpty",
          "quantity": 72,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "EmptyCanProductionT5Aluminum",
      "name": "Empty can production T5 (aluminum)",
      "description": "",
      "durationSeconds": 20,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Aluminum",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "FoodCanEmpty",
          "quantity": 24,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Aluminum",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "FoodCanEmpty",
          "quantity": 24,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "FoodCanPackT1",
      "name": "Food can pack assembly",
      "description": "",
      "durationSeconds": 40,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "FoodCanFish",
          "quantity": 5,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FoodCanFruit",
          "quantity": 5,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FoodCanVegetables",
          "quantity": 5,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "FoodCanPack",
          "quantity": 5,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "FoodCanFish",
          "quantity": 5,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FoodCanFruit",
          "quantity": 5,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FoodCanVegetables",
          "quantity": 5,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "FoodCanPack",
          "quantity": 5,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "FoodCanPackT2",
      "name": "Food can pack assembly",
      "description": "",
      "durationSeconds": 20,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "FoodCanFish",
          "quantity": 5,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FoodCanFruit",
          "quantity": 5,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FoodCanVegetables",
          "quantity": 5,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "FoodCanPack",
          "quantity": 5,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "FoodCanFish",
          "quantity": 5,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FoodCanFruit",
          "quantity": 5,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FoodCanVegetables",
          "quantity": 5,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "FoodCanPack",
          "quantity": 5,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "FoodCanPackT3",
      "name": "Food can pack assembly",
      "description": "",
      "durationSeconds": 10,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "FoodCanFish",
          "quantity": 5,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FoodCanFruit",
          "quantity": 5,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FoodCanVegetables",
          "quantity": 5,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "FoodCanPack",
          "quantity": 5,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "FoodCanFish",
          "quantity": 5,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FoodCanFruit",
          "quantity": 5,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FoodCanVegetables",
          "quantity": 5,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "FoodCanPack",
          "quantity": 5,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 5,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "AntibioticsFromFishOil",
      "name": "Antibiotics from Fish Oil and Biomass",
      "description": "",
      "durationSeconds": 60,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "FishOil",
          "quantity": 6,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Biomass",
          "quantity": 2,
          "ports": [
            {
              "id": "E",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 6,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "F",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 5,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_Antibiotics",
          "quantity": 2,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "FishOil",
          "quantity": 6,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Biomass",
          "quantity": 2,
          "ports": [
            {
              "id": "E",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 6,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "F",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 5,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_Antibiotics",
          "quantity": 2,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "FertilizerFromFishScales",
      "name": "Fertilizer mixing",
      "description": "",
      "durationSeconds": 20,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Compost",
          "quantity": 4,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FishScales",
          "quantity": 8,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Water",
          "quantity": 4,
          "ports": [
            {
              "id": "D",
              "type": "input",
              "pos": {
                "x": 1,
                "y": 5,
                "z": 0
              },
              "dir": "\u002BY"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_FertilizerOrganic",
          "quantity": 16,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 1,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Compost",
          "quantity": 4,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FishScales",
          "quantity": 8,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Water",
          "quantity": 4,
          "ports": [
            {
              "id": "D",
              "type": "input",
              "pos": {
                "x": 1,
                "y": 5,
                "z": 0
              },
              "dir": "\u002BY"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_FertilizerOrganic",
          "quantity": 16,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 1,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "FertilizerFromFishScalesT2",
      "name": "Fertilizer mixing",
      "description": "",
      "durationSeconds": 10,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Compost",
          "quantity": 4,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FishScales",
          "quantity": 8,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Water",
          "quantity": 4,
          "ports": [
            {
              "id": "D",
              "type": "input",
              "pos": {
                "x": 1,
                "y": 5,
                "z": 0
              },
              "dir": "\u002BY"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_FertilizerOrganic",
          "quantity": 16,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 1,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Compost",
          "quantity": 4,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FishScales",
          "quantity": 8,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Water",
          "quantity": 4,
          "ports": [
            {
              "id": "D",
              "type": "input",
              "pos": {
                "x": 1,
                "y": 5,
                "z": 0
              },
              "dir": "\u002BY"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_FertilizerOrganic",
          "quantity": 16,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 1,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "FertilizerFromDirtScales",
      "name": "Fertilizer mixing (dirt)",
      "description": "",
      "durationSeconds": 20,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Compost",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Dirt",
          "quantity": 3,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FishScales",
          "quantity": 8,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Water",
          "quantity": 4,
          "ports": [
            {
              "id": "D",
              "type": "input",
              "pos": {
                "x": 1,
                "y": 5,
                "z": 0
              },
              "dir": "\u002BY"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_FertilizerOrganic",
          "quantity": 16,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 1,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Compost",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Dirt",
          "quantity": 3,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FishScales",
          "quantity": 8,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Water",
          "quantity": 4,
          "ports": [
            {
              "id": "D",
              "type": "input",
              "pos": {
                "x": 1,
                "y": 5,
                "z": 0
              },
              "dir": "\u002BY"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_FertilizerOrganic",
          "quantity": 16,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 1,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "FertilizerFromDirtScalesT2",
      "name": "Fertilizer mixing (dirt)",
      "description": "",
      "durationSeconds": 10,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Compost",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Dirt",
          "quantity": 3,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FishScales",
          "quantity": 8,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Water",
          "quantity": 4,
          "ports": [
            {
              "id": "D",
              "type": "input",
              "pos": {
                "x": 1,
                "y": 5,
                "z": 0
              },
              "dir": "\u002BY"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_FertilizerOrganic",
          "quantity": 16,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 1,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Compost",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Dirt",
          "quantity": 3,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "FishScales",
          "quantity": 8,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Water",
          "quantity": 4,
          "ports": [
            {
              "id": "D",
              "type": "input",
              "pos": {
                "x": 1,
                "y": 5,
                "z": 0
              },
              "dir": "\u002BY"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_FertilizerOrganic",
          "quantity": 16,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 1,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "SolidBurnerFishScales",
      "name": "Burning",
      "description": "",
      "durationSeconds": 10,
      "powerMultiplier": 100,
      "destroyReason": "DumpedOnTerrain",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "FishScales",
          "quantity": 8,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_Virtual_PollutedAir",
          "quantity": 4,
          "ports": [],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": true
        }
      ],
      "visibleInputs": [
        {
          "productId": "FishScales",
          "quantity": 8,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_Virtual_PollutedAir",
          "quantity": 4,
          "ports": [],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": true
        }
      ]
    },
    {
      "id": "WasteDisposalFishOil",
      "name": "Fish oil dumping",
      "description": "",
      "durationSeconds": 2,
      "powerMultiplier": 100,
      "destroyReason": "DumpedOnTerrain",
      "minUtilizationPercent": 1,
      "quantitiesGcd": 2,
      "inputs": [
        {
          "productId": "FishOil",
          "quantity": 2,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 20,
                "y": 1,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [],
      "visibleInputs": [
        {
          "productId": "FishOil",
          "quantity": 2,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 20,
                "y": 1,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": []
    },
    {
      "id": "CrudeOilRefiningT2COIE",
      "name": "Crude oil refining II",
      "description": "",
      "durationSeconds": 10,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_CrudeOil",
          "quantity": 20,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamHi",
          "quantity": 2,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BY"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_MediumOil",
          "quantity": 16,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_HeavyOil",
          "quantity": 4,
          "ports": [
            {
              "id": "Z",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SourWater",
          "quantity": 6,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BY"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_CrudeOil",
          "quantity": 20,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamHi",
          "quantity": 2,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BY"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_MediumOil",
          "quantity": 16,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_HeavyOil",
          "quantity": 4,
          "ports": [
            {
              "id": "Z",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SourWater",
          "quantity": 6,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BY"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "CrudeOilRefiningT2Sp",
      "name": "Crude oil refining II Sp",
      "description": "",
      "durationSeconds": 10,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_CrudeOil",
          "quantity": 20,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamSp",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BY"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_MediumOil",
          "quantity": 16,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_HeavyOil",
          "quantity": 4,
          "ports": [
            {
              "id": "Z",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SourWater",
          "quantity": 6,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BY"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_CrudeOil",
          "quantity": 20,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamSp",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BY"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_MediumOil",
          "quantity": 16,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_HeavyOil",
          "quantity": 4,
          "ports": [
            {
              "id": "Z",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SourWater",
          "quantity": 6,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BY"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "MediumOilRefiningT2",
      "name": "Medium oil refining II",
      "description": "",
      "durationSeconds": 10,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_MediumOil",
          "quantity": 16,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamHi",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BY"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_Diesel",
          "quantity": 12,
          "ports": [
            {
              "id": "Z",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_LightOil",
          "quantity": 10,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_MediumOil",
          "quantity": 16,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamHi",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BY"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_Diesel",
          "quantity": 12,
          "ports": [
            {
              "id": "Z",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_LightOil",
          "quantity": 10,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "MediumOilRefiningT2Sp",
      "name": "Medium oil refining II Sp",
      "description": "",
      "durationSeconds": 20,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_MediumOil",
          "quantity": 32,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamSp",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BY"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_Diesel",
          "quantity": 24,
          "ports": [
            {
              "id": "Z",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_LightOil",
          "quantity": 20,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_MediumOil",
          "quantity": 32,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamSp",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BY"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_Diesel",
          "quantity": 24,
          "ports": [
            {
              "id": "Z",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_LightOil",
          "quantity": 20,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "LightOilRefiningT2",
      "name": "Light oil refining II",
      "description": "",
      "durationSeconds": 10,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_LightOil",
          "quantity": 10,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamHi",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BY"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_Naphtha",
          "quantity": 8,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_FuelGas",
          "quantity": 4,
          "ports": [
            {
              "id": "Z",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_LightOil",
          "quantity": 10,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamHi",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BY"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_Naphtha",
          "quantity": 8,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_FuelGas",
          "quantity": 4,
          "ports": [
            {
              "id": "Z",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "LightOilRefiningT2Sp",
      "name": "Light oil refining II Sp",
      "description": "",
      "durationSeconds": 20,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_LightOil",
          "quantity": 20,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamSp",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BY"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_Naphtha",
          "quantity": 16,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_FuelGas",
          "quantity": 8,
          "ports": [
            {
              "id": "Z",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_LightOil",
          "quantity": 20,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamSp",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BY"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_Naphtha",
          "quantity": 16,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_FuelGas",
          "quantity": 8,
          "ports": [
            {
              "id": "Z",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "TitaniumPurificationT2",
      "name": "Titanium purification II",
      "description": "",
      "durationSeconds": 10,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_TitaniumChloride",
          "quantity": 4,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamHi",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BY"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_TitaniumChloridePure",
          "quantity": 4,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamDepleted",
          "quantity": 1,
          "ports": [
            {
              "id": "Z",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_TitaniumChloride",
          "quantity": 4,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamHi",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BY"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_TitaniumChloridePure",
          "quantity": 4,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamDepleted",
          "quantity": 1,
          "ports": [
            {
              "id": "Z",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "TitaniumPurificationT2Sp",
      "name": "Titanium purification II",
      "description": "",
      "durationSeconds": 20,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_TitaniumChloride",
          "quantity": 8,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamSp",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BY"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_TitaniumChloridePure",
          "quantity": 8,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamDepleted",
          "quantity": 1,
          "ports": [
            {
              "id": "Z",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_TitaniumChloride",
          "quantity": 8,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamSp",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BY"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_TitaniumChloridePure",
          "quantity": 8,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 2,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamDepleted",
          "quantity": 1,
          "ports": [
            {
              "id": "Z",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "SynfuelLiquidRefining",
      "name": "SynfuelLiquid Synthesis",
      "description": "",
      "durationSeconds": 10,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_LightOil",
          "quantity": 12,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Hydrogen",
          "quantity": 6,
          "ports": [
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamSp",
          "quantity": 3,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 4,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "SynfuelLiquid",
          "quantity": 6,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 5,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_FuelGas",
          "quantity": 3,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SourWater",
          "quantity": 3,
          "ports": [
            {
              "id": "Z",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_LightOil",
          "quantity": 12,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Hydrogen",
          "quantity": 6,
          "ports": [
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamSp",
          "quantity": 3,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 4,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "SynfuelLiquid",
          "quantity": 6,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 5,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_FuelGas",
          "quantity": 3,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SourWater",
          "quantity": 3,
          "ports": [
            {
              "id": "Z",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "SynfuelGasRefining",
      "name": "SynfuelGas Synthesis",
      "description": "",
      "durationSeconds": 10,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_FuelGas",
          "quantity": 12,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Hydrogen",
          "quantity": 6,
          "ports": [
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamSp",
          "quantity": 3,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 4,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "SynfuelGas",
          "quantity": 6,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_CarbonDioxide",
          "quantity": 3,
          "ports": [
            {
              "id": "Z",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_FuelGas",
          "quantity": 12,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Hydrogen",
          "quantity": 6,
          "ports": [
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamSp",
          "quantity": 3,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 4,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "SynfuelGas",
          "quantity": 6,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 4,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_CarbonDioxide",
          "quantity": 3,
          "ports": [
            {
              "id": "Z",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "IncineratingWasteSyngas",
      "name": "Waste incineration",
      "description": "",
      "durationSeconds": 60,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Waste",
          "quantity": 144,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "SynfuelGas",
          "quantity": 2,
          "ports": [
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 6,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Water",
          "quantity": 18,
          "ports": [
            {
              "id": "D",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 0,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_Exhaust",
          "quantity": 72,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 13,
                "y": 6,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamHi",
          "quantity": 18,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 13,
                "y": 0,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Waste",
          "quantity": 144,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "SynfuelGas",
          "quantity": 2,
          "ports": [
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 6,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Water",
          "quantity": 18,
          "ports": [
            {
              "id": "D",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 0,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_Exhaust",
          "quantity": 72,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 13,
                "y": 6,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamHi",
          "quantity": 18,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 13,
                "y": 0,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "IncineratingWastePressedSyngas",
      "name": "Waste incineration",
      "description": "",
      "durationSeconds": 60,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_WastePressed",
          "quantity": 48,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "SynfuelGas",
          "quantity": 2,
          "ports": [
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 6,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Water",
          "quantity": 18,
          "ports": [
            {
              "id": "D",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 0,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_Exhaust",
          "quantity": 72,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 13,
                "y": 6,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamHi",
          "quantity": 18,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 13,
                "y": 0,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_WastePressed",
          "quantity": 48,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "SynfuelGas",
          "quantity": 2,
          "ports": [
            {
              "id": "C",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 6,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Water",
          "quantity": 18,
          "ports": [
            {
              "id": "D",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 0,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_Exhaust",
          "quantity": 72,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 13,
                "y": 6,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamHi",
          "quantity": 18,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 13,
                "y": 0,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "HPSteamGenerationHeavyOil",
      "name": "Super Steam from Heavy Oil",
      "description": "",
      "durationSeconds": 10,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Water",
          "quantity": 8,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_HeavyOil",
          "quantity": 12,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_SteamSp",
          "quantity": 8,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 1,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Exhaust",
          "quantity": 15,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Water",
          "quantity": 8,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_HeavyOil",
          "quantity": 12,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_SteamSp",
          "quantity": 8,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 1,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Exhaust",
          "quantity": 15,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "HPSteamGenerationMediumOil",
      "name": "Super Steam from Medium Oil",
      "description": "",
      "durationSeconds": 10,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Water",
          "quantity": 8,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_MediumOil",
          "quantity": 14,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_SteamSp",
          "quantity": 8,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 1,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Exhaust",
          "quantity": 15,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Water",
          "quantity": 8,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_MediumOil",
          "quantity": 14,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_SteamSp",
          "quantity": 8,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 1,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Exhaust",
          "quantity": 15,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "HPSteamGenerationLightOil",
      "name": "Super Steam from Light Oil",
      "description": "",
      "durationSeconds": 10,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Water",
          "quantity": 8,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_LightOil",
          "quantity": 18,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_SteamSp",
          "quantity": 8,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 1,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Exhaust",
          "quantity": 12,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Water",
          "quantity": 8,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_LightOil",
          "quantity": 18,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_SteamSp",
          "quantity": 8,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 1,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Exhaust",
          "quantity": 12,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "HPSteamGenerationNaphtha",
      "name": "Super Steam from Naphtha",
      "description": "",
      "durationSeconds": 10,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Water",
          "quantity": 8,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Naphtha",
          "quantity": 18,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_SteamSp",
          "quantity": 8,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 1,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Exhaust",
          "quantity": 12,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Water",
          "quantity": 8,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Naphtha",
          "quantity": 18,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_SteamSp",
          "quantity": 8,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 1,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Exhaust",
          "quantity": 12,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "HPSteamGenerationEthanol",
      "name": "Super Steam from Ethanol",
      "description": "",
      "durationSeconds": 10,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Water",
          "quantity": 8,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Ethanol",
          "quantity": 18,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_SteamSp",
          "quantity": 8,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 1,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_CarbonDioxide",
          "quantity": 12,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Water",
          "quantity": 8,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Ethanol",
          "quantity": 18,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_SteamSp",
          "quantity": 8,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 1,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_CarbonDioxide",
          "quantity": 12,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "HPSteamGenerationFuelGas",
      "name": "Super Steam from Fuel Gas",
      "description": "",
      "durationSeconds": 10,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Water",
          "quantity": 8,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_FuelGas",
          "quantity": 24,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_SteamSp",
          "quantity": 8,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 1,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_CarbonDioxide",
          "quantity": 12,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Water",
          "quantity": 8,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_FuelGas",
          "quantity": 24,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_SteamSp",
          "quantity": 8,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 1,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_CarbonDioxide",
          "quantity": 12,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "HPSteamGenerationSynfluidSuper",
      "name": "Super Steam from Synfuel (Liquid)",
      "description": "",
      "durationSeconds": 10,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Water",
          "quantity": 8,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "SynfuelLiquid",
          "quantity": 3,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_SteamSp",
          "quantity": 8,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 1,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_CarbonDioxide",
          "quantity": 2,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Water",
          "quantity": 8,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "SynfuelLiquid",
          "quantity": 3,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_SteamSp",
          "quantity": 8,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 1,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_CarbonDioxide",
          "quantity": 2,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "HPSteamGenerationSyngasSuper",
      "name": "Super Steam from Synfuel (Gas)",
      "description": "",
      "durationSeconds": 10,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Water",
          "quantity": 8,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "SynfuelGas",
          "quantity": 4,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_SteamSp",
          "quantity": 8,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 1,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_CarbonDioxide",
          "quantity": 2,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Water",
          "quantity": 8,
          "ports": [
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 2,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "SynfuelGas",
          "quantity": 4,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_SteamSp",
          "quantity": 8,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 4,
                "y": 1,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_CarbonDioxide",
          "quantity": 2,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "HeavyOilCrackingT2",
      "name": "HeavyOil cracking II",
      "description": "",
      "durationSeconds": 10,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_HeavyOil",
          "quantity": 8,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Hydrogen",
          "quantity": 3,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_Diesel",
          "quantity": 12,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 8,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_FuelGas",
          "quantity": 2,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_HeavyOil",
          "quantity": 8,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Hydrogen",
          "quantity": 3,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_Diesel",
          "quantity": 12,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 8,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_FuelGas",
          "quantity": 2,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "HeavyOilCrackingToNaphthaT2",
      "name": "HeavyOil cracking II",
      "description": "",
      "durationSeconds": 10,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_HeavyOil",
          "quantity": 8,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Hydrogen",
          "quantity": 3,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_Naphtha",
          "quantity": 12,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 8,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_FuelGas",
          "quantity": 2,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_HeavyOil",
          "quantity": 8,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Hydrogen",
          "quantity": 3,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_Naphtha",
          "quantity": 12,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 8,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_FuelGas",
          "quantity": 2,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "NaphthaReformingT2",
      "name": "Naphtha reforming II",
      "description": "",
      "durationSeconds": 10,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Naphtha",
          "quantity": 8,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Hydrogen",
          "quantity": 3,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_Diesel",
          "quantity": 8,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 8,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_FuelGas",
          "quantity": 2,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Naphtha",
          "quantity": 8,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Hydrogen",
          "quantity": 3,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_Diesel",
          "quantity": 8,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 8,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_FuelGas",
          "quantity": 2,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "DieselReformingT2",
      "name": "Diesel reforming II",
      "description": "",
      "durationSeconds": 10,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Diesel",
          "quantity": 8,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamHi",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_Naphtha",
          "quantity": 6,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 8,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_FuelGas",
          "quantity": 2,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Diesel",
          "quantity": 8,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamHi",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_Naphtha",
          "quantity": 6,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 8,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_FuelGas",
          "quantity": 2,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "DieselReformingT2Sp",
      "name": "Diesel reforming II Sp",
      "description": "",
      "durationSeconds": 20,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Diesel",
          "quantity": 16,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamSp",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_Naphtha",
          "quantity": 12,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 8,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_FuelGas",
          "quantity": 4,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Diesel",
          "quantity": 16,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamSp",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_Naphtha",
          "quantity": 12,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 8,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_FuelGas",
          "quantity": 4,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "NaphthaReformingToGasT2",
      "name": "Naphtha reforming II",
      "description": "",
      "durationSeconds": 15,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Naphtha",
          "quantity": 12,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamHi",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_FuelGas",
          "quantity": 12,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 8,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Hydrogen",
          "quantity": 4,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Naphtha",
          "quantity": 12,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamHi",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_FuelGas",
          "quantity": 12,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 8,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Hydrogen",
          "quantity": 4,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "NaphthaReformingToGasT2Sp",
      "name": "Naphtha reforming II",
      "description": "",
      "durationSeconds": 30,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_Naphtha",
          "quantity": 24,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamSp",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_FuelGas",
          "quantity": 24,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 8,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Hydrogen",
          "quantity": 8,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_Naphtha",
          "quantity": 24,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamSp",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_FuelGas",
          "quantity": 24,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 8,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Hydrogen",
          "quantity": 8,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "FuelGasReformingT2",
      "name": "FuelGas reforming II",
      "description": "",
      "durationSeconds": 10,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_FuelGas",
          "quantity": 12,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Oxygen",
          "quantity": 6,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_Diesel",
          "quantity": 8,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 8,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Water",
          "quantity": 2,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_FuelGas",
          "quantity": 12,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Oxygen",
          "quantity": 6,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_Diesel",
          "quantity": 8,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 8,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Water",
          "quantity": 2,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "HeavyOilToMediumCrackingT2",
      "name": "Heavy Oil to Medium Oil cracking II",
      "description": "",
      "durationSeconds": 5,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_HeavyOil",
          "quantity": 4,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Hydrogen",
          "quantity": 2,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_MediumOil",
          "quantity": 6,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 8,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_FuelGas",
          "quantity": 1,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_HeavyOil",
          "quantity": 4,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Hydrogen",
          "quantity": 2,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_MediumOil",
          "quantity": 6,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 8,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_FuelGas",
          "quantity": 1,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "MediumOilToLightCrackingT2",
      "name": "Medium Oil to Light Oil cracking II",
      "description": "",
      "durationSeconds": 5,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_MediumOil",
          "quantity": 4,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Hydrogen",
          "quantity": 2,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_LightOil",
          "quantity": 6,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 8,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_FuelGas",
          "quantity": 1,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_MediumOil",
          "quantity": 4,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Hydrogen",
          "quantity": 2,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_LightOil",
          "quantity": 6,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 8,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_FuelGas",
          "quantity": 1,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "HeavyOilToMediumCracking",
      "name": "Heavy Oil to Medium Oil cracking",
      "description": "",
      "durationSeconds": 10,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_HeavyOil",
          "quantity": 4,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Hydrogen",
          "quantity": 2,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_MediumOil",
          "quantity": 6,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 8,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_FuelGas",
          "quantity": 1,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_HeavyOil",
          "quantity": 4,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Hydrogen",
          "quantity": 2,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_MediumOil",
          "quantity": 6,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 8,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_FuelGas",
          "quantity": 1,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "MediumOilToLightCracking",
      "name": "Medium Oil to Light Oil cracking",
      "description": "",
      "durationSeconds": 10,
      "powerMultiplier": 100,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_MediumOil",
          "quantity": 4,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Hydrogen",
          "quantity": 2,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_LightOil",
          "quantity": 6,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 8,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_FuelGas",
          "quantity": 1,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_MediumOil",
          "quantity": 4,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Hydrogen",
          "quantity": 2,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 3,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 2,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_LightOil",
          "quantity": 6,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 8,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_FuelGas",
          "quantity": 1,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "SourWaterStrippingT2",
      "name": "Sour water stripping (recovery) II",
      "description": "",
      "durationSeconds": 10,
      "powerMultiplier": 150,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_SourWater",
          "quantity": 12,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamHi",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_Sulfur",
          "quantity": 3,
          "ports": [
            {
              "id": "Z",
              "type": "output",
              "pos": {
                "x": 7,
                "y": 1,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Ammonia",
          "quantity": 3,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 1,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Water",
          "quantity": 7,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 8,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_SourWater",
          "quantity": 12,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamHi",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_Sulfur",
          "quantity": 3,
          "ports": [
            {
              "id": "Z",
              "type": "output",
              "pos": {
                "x": 7,
                "y": 1,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Ammonia",
          "quantity": 3,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 1,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Water",
          "quantity": 7,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 8,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    },
    {
      "id": "SourWaterStrippingT2Sp",
      "name": "Sour water stripping (recovery) II Super Steam",
      "description": "",
      "durationSeconds": 20,
      "powerMultiplier": 150,
      "destroyReason": "General",
      "minUtilizationPercent": 100,
      "quantitiesGcd": 1,
      "inputs": [
        {
          "productId": "Product_SourWater",
          "quantity": 24,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamSp",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "outputs": [
        {
          "productId": "Product_Sulfur",
          "quantity": 6,
          "ports": [
            {
              "id": "Z",
              "type": "output",
              "pos": {
                "x": 7,
                "y": 1,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Ammonia",
          "quantity": 6,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 1,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Water",
          "quantity": 14,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 8,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleInputs": [
        {
          "productId": "Product_SourWater",
          "quantity": 24,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_SteamSp",
          "quantity": 1,
          "ports": [
            {
              "id": "A",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 1,
                "z": 0
              },
              "dir": "-X"
            },
            {
              "id": "B",
              "type": "input",
              "pos": {
                "x": 0,
                "y": 0,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ],
      "visibleOutputs": [
        {
          "productId": "Product_Sulfur",
          "quantity": 6,
          "ports": [
            {
              "id": "Z",
              "type": "output",
              "pos": {
                "x": 7,
                "y": 1,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Ammonia",
          "quantity": 6,
          "ports": [
            {
              "id": "X",
              "type": "output",
              "pos": {
                "x": 6,
                "y": 1,
                "z": 0
              },
              "dir": "-Y"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        },
        {
          "productId": "Product_Water",
          "quantity": 14,
          "ports": [
            {
              "id": "Y",
              "type": "output",
              "pos": {
                "x": 8,
                "y": 3,
                "z": 0
              },
              "dir": "\u002BX"
            }
          ],
          "hideInUi": false,
          "triggerAtStart": false,
          "isPollution": false
        }
      ]
    }
  ],
  "resources": [],
  "buildings": [
    {
      "id": "Counter_IoPortShape_FlatConveyor",
      "name": "Flat counter",
      "description": "Connects multiple conveyor belts and counts products between them.",
      "image": "Assets/Logistics/Counter/CounterFlat.prefab",
      "layout": {
        "width": 1,
        "height": 1,
        "thickness": 1,
        "layoutString": "   B#\u002B   \n\u002B#C{1}A#\u002B\n   D#\u002B   ",
        "ports": [
          {
            "id": "B",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "C",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "A",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "D",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          }
        ]
      },
      "workers": 0,
      "price": [],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "Zipper_IoPortShape_FlatConveyor_small",
      "name": "Flat balancer (small)",
      "description": "Four way balancer.",
      "image": "Assets/Base/MiniZippers/ConnectorFlat.prefab",
      "layout": {
        "width": 1,
        "height": 1,
        "thickness": 1,
        "layoutString": "   B#\u002B   \n\u002B#C|1|A#\u002B\n   D#\u002B   ",
        "ports": [
          {
            "id": "B",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "C",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "A",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "D",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          }
        ]
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConstructionParts2",
          "quantity": 8
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "Zipper_IoPortShape_FlatConveyor_large",
      "name": "Flat balancer (large)",
      "description": "Twelve way balancer.",
      "image": "Assets/Logistics/Balancers/BalancerUnitLarge.prefab",
      "layout": {
        "width": 3,
        "height": 3,
        "thickness": 1,
        "layoutString": "   #J\u002B#K\u002B#L\u002B   \n#D\u002B|1||1||1|#A\u002B\n#E\u002B|1||1||1|#B\u002B\n#F\u002B|1||1||1|#C\u002B\n   #G\u002B#H\u002B#I\u002B   ",
        "ports": [
          {
            "id": "J",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 2,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "K",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 2,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "L",
            "type": "any",
            "pos": {
              "x": 2,
              "y": 2,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "D",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 2,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "A",
            "type": "any",
            "pos": {
              "x": 2,
              "y": 2,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "E",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 1,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "B",
            "type": "any",
            "pos": {
              "x": 2,
              "y": 1,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "F",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "C",
            "type": "any",
            "pos": {
              "x": 2,
              "y": 0,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "G",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          },
          {
            "id": "H",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          },
          {
            "id": "I",
            "type": "any",
            "pos": {
              "x": 2,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          }
        ]
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConstructionParts2",
          "quantity": 8
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "Zipper_IoPortShape_FlatConveyor_long",
      "name": "Flat balancer (long)",
      "description": "Twelve way balancer (long).",
      "image": "Assets/Logistics/Balancers/BalancerUnitLong.prefab",
      "layout": {
        "width": 2,
        "height": 4,
        "thickness": 1,
        "layoutString": "   #K\u002B#L\u002B   \n#H\u002B|1||1|#A\u002B\n#G\u002B|1||1|#B\u002B\n#F\u002B|1||1|#C\u002B\n#E\u002B|1||1|#D\u002B\n   #J\u002B#I\u002B   ",
        "ports": [
          {
            "id": "K",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 3,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "L",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 3,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "H",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 3,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "A",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 3,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "G",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 2,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "B",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 2,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "F",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 1,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "C",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 1,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "E",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "D",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 0,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "J",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          },
          {
            "id": "I",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          }
        ]
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConstructionParts2",
          "quantity": 8
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "RetainingWallRamp2",
      "name": "Retaining ramp (medium-deep)",
      "description": "Prevents terrain from collapsing. Walls can be placed below the surface to prevent terrain collapse during mining, or above terrain to aid with dumping operations. The placement elevation is adjustable. Walls will collapse if they hold more than 5 units of height or if they are overfilled.",
      "image": "Assets/Structures/Walls/NewRetainingWall4mRamp.prefab",
      "layout": {
        "width": 2,
        "height": 2,
        "thickness": 1,
        "layoutString": "(W)(W)\n(W)(W)",
        "ports": []
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_Iron",
          "quantity": 2
        },
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 6
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "RetainingWallStraight2",
      "name": "Retaining wall (medium)",
      "description": "Prevents terrain from collapsing. Walls can be placed below the surface to prevent terrain collapse during mining, or above terrain to aid with dumping operations. The placement elevation is adjustable. Walls will collapse if they hold more than 5 units of height or if they are overfilled.",
      "image": "Assets/Structures/Walls/NewRetainingWall4m.prefab",
      "layout": {
        "width": 2,
        "height": 2,
        "thickness": 1,
        "layoutString": "(W)(W)\n(W)(W)",
        "ports": []
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_Iron",
          "quantity": 2
        },
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 6
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "RetainingWallRamp2ShallowOffset",
      "name": "Retaining ramp (medium-shallow) offset",
      "description": "Prevents terrain from collapsing. Walls can be placed below the surface to prevent terrain collapse during mining, or above terrain to aid with dumping operations. The placement elevation is adjustable. Walls will collapse if they hold more than 5 units of height or if they are overfilled.",
      "image": "Assets/Structures/Walls/RetainingWall4mRampShallow.prefab",
      "layout": {
        "width": 2,
        "height": 2,
        "thickness": 1,
        "layoutString": "(W)(W)\n(W)(W)",
        "ports": []
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_Iron",
          "quantity": 2
        },
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 6
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "RetainingWallRamp2Shallow",
      "name": "Retaining ramp (medium-shallow)",
      "description": "Prevents terrain from collapsing. Walls can be placed below the surface to prevent terrain collapse during mining, or above terrain to aid with dumping operations. The placement elevation is adjustable. Walls will collapse if they hold more than 5 units of height or if they are overfilled.",
      "image": "Assets/Structures/Walls/RetainingWall4mRampShallow.prefab",
      "layout": {
        "width": 2,
        "height": 2,
        "thickness": 1,
        "layoutString": "(W)(W)\n(W)(W)",
        "ports": []
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_Iron",
          "quantity": 2
        },
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 6
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "RetainingWallStraight1",
      "name": "Retaining wall (short)",
      "description": "Prevents terrain from collapsing. Walls can be placed below the surface to prevent terrain collapse during mining, or above terrain to aid with dumping operations. The placement elevation is adjustable. Walls will collapse if they hold more than 5 units of height or if they are overfilled.",
      "image": "Assets/Structures/Walls/NewRetainingWall2m.prefab",
      "layout": {
        "width": 1,
        "height": 2,
        "thickness": 1,
        "layoutString": "(W)\n(W)",
        "ports": []
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_Iron",
          "quantity": 2
        },
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 6
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "Stacker",
      "name": "Stacker",
      "description": "Dumps material from connected conveyor belts directly on the terrain.",
      "image": "Assets/Base/Transports/Stacker/Stacker.prefab",
      "layout": {
        "width": 24,
        "height": 5,
        "thickness": 12,
        "layoutString": "                        (1G(1G                                             \n   [2][2][2]      (3A(2G(2X(3X(4B(5A                                       \nA~\u003E[2][2][2](3A(3A(4B(4G(5X(5X(6D(6B(7A(7A(8A(8A(9B(9A10B10A11B11A12B12A12A\n   [2][2][2]      (3A(2G(2X(3X(4B(5A                                       \n                        (1G(1G                                             ",
        "ports": [
          {
            "id": "A",
            "type": "input",
            "pos": {
              "x": 0,
              "y": 2,
              "z": 0
            },
            "dir": "-X"
          }
        ]
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConstructionParts2",
          "quantity": 10
        },
        {
          "productId": "Product_Rubber",
          "quantity": 10
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "CargoShipDrydock",
      "name": "Cargo Ship Drydock",
      "description": "Constructs a dedicated Cargo Ship Drydock, enabling the assembly and deployment of cargo ships to efficiently transport large volumes of resources across the seas.",
      "image": "Assets/World/CargoDrydock.prefab",
      "layout": {
        "width": 35,
        "height": 86,
        "thickness": 9,
        "layoutString": "                                                                                                            \n                                                                                                            \n                                                                                                            \n~~~~~~~~~~~~                                                                                                \n~~~~~~~~~~~~~~~                                                                                             \n~~~~~~~~~~~~~~~~~~                                                                                          \n~~~~~~~~~~~~~~~~~~~~~                                                                                       \n~~~~~~~~~~~~~~~~~~~~~~~~                                                                                    \n~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                                 \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                              \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                           \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                        \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                     \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                  \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                               \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                            \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{9!{9!{9!{9!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{9!{9!{9!{9!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)\u003C@F\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{9!{9!{9!{9!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)\u003C#A\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)\u003C#B\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)\u003C#C\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{9!{9!{9!{9!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{9!{9!{9!{9!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)\u003C#D\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{9!{9!{9!{9!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                            \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                               \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                  \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                     \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                        \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                           \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                              \n~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                                 \n~~~~~~~~~~~~~~~~~~~~~~~~                                                                                    \n~~~~~~~~~~~~~~~~~~~~~                                                                                       \n~~~~~~~~~~~~~~~~~~                                                                                          \n~~~~~~~~~~~~~~~                                                                                             \n~~~~~~~~~~~~                                                                                                \n                                                                                                            \n                                                                                                            \n                                                                                                            ",
        "ports": [
          {
            "id": "F",
            "type": "input",
            "pos": {
              "x": 34,
              "y": 60,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "A",
            "type": "input",
            "pos": {
              "x": 34,
              "y": 37,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "B",
            "type": "input",
            "pos": {
              "x": 34,
              "y": 35,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "C",
            "type": "input",
            "pos": {
              "x": 34,
              "y": 32,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "D",
            "type": "input",
            "pos": {
              "x": 34,
              "y": 30,
              "z": 0
            },
            "dir": "\u002BX"
          }
        ]
      },
      "workers": 18,
      "price": [
        {
          "productId": "Product_ConstructionParts",
          "quantity": 175
        },
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 200
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "BarrierStraight1Fresh",
      "name": "Barrier HD (straight)",
      "description": "Barrier that blocks vehicle access.",
      "image": "Assets/Structures/Barriers/BarrierStraightHD.prefab",
      "layout": {
        "width": 1,
        "height": 1,
        "thickness": 1,
        "layoutString": "[1]",
        "ports": []
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 1
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "BarrierCornerFresh",
      "name": "Barrier HD (corner)",
      "description": "Barrier that blocks vehicle access.",
      "image": "Assets/Structures/Barriers/BarrierCornerHD.prefab",
      "layout": {
        "width": 1,
        "height": 1,
        "thickness": 1,
        "layoutString": "[1]",
        "ports": []
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 1
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "BarrierCrossFresh",
      "name": "Barrier HD (cross)",
      "description": "Barrier that blocks vehicle access.",
      "image": "Assets/Structures/Barriers/BarrierCrossHD.prefab",
      "layout": {
        "width": 1,
        "height": 1,
        "thickness": 1,
        "layoutString": "[1]",
        "ports": []
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 1
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "BarrierTeeFresh",
      "name": "Barrier HD (tee)",
      "description": "Barrier that blocks vehicle access.",
      "image": "Assets/Structures/Barriers/BarrierTeeHD.prefab",
      "layout": {
        "width": 1,
        "height": 1,
        "thickness": 1,
        "layoutString": "[1]",
        "ports": []
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 1
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "BarrierEndingFresh",
      "name": "Barrier HD (ending)",
      "description": "Barrier that blocks vehicle access.",
      "image": "Assets/Structures/Barriers/BarrierEndHD.prefab",
      "layout": {
        "width": 1,
        "height": 1,
        "thickness": 1,
        "layoutString": "[1]",
        "ports": []
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 1
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "BarrierStraight1Washed",
      "name": "Barrier Washed (straight)",
      "description": "Barrier that blocks vehicle access.",
      "image": "Assets/Structures/Barriers/BarrierStraightWashed.prefab",
      "layout": {
        "width": 1,
        "height": 1,
        "thickness": 1,
        "layoutString": "[1]",
        "ports": []
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 1
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "BarrierCornerWashed",
      "name": "Barrier Washed (corner)",
      "description": "Barrier that blocks vehicle access.",
      "image": "Assets/Structures/Barriers/BarrierCornerWashed.prefab",
      "layout": {
        "width": 1,
        "height": 1,
        "thickness": 1,
        "layoutString": "[1]",
        "ports": []
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 1
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "BarrierCrossWashed",
      "name": "Barrier Washed (cross)",
      "description": "Barrier that blocks vehicle access.",
      "image": "Assets/Structures/Barriers/BarrierCrossWashed.prefab",
      "layout": {
        "width": 1,
        "height": 1,
        "thickness": 1,
        "layoutString": "[1]",
        "ports": []
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 1
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "BarrierTeeWashed",
      "name": "Barrier Washed (tee)",
      "description": "Barrier that blocks vehicle access.",
      "image": "Assets/Structures/Barriers/BarrierTeeWashed.prefab",
      "layout": {
        "width": 1,
        "height": 1,
        "thickness": 1,
        "layoutString": "[1]",
        "ports": []
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 1
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "BarrierEndingWashed",
      "name": "Barrier Washed (ending)",
      "description": "Barrier that blocks vehicle access.",
      "image": "Assets/Structures/Barriers/BarrierEndWashed.prefab",
      "layout": {
        "width": 1,
        "height": 1,
        "thickness": 1,
        "layoutString": "[1]",
        "ports": []
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 1
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "BarrierStraight1Red",
      "name": "Barrier Red (straight)",
      "description": "Barrier that blocks vehicle access.",
      "image": "Assets/Structures/Barriers/BarrierStraightRed.prefab",
      "layout": {
        "width": 1,
        "height": 1,
        "thickness": 1,
        "layoutString": "[1]",
        "ports": []
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 1
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "BarrierCornerRed",
      "name": "Barrier Red (corner)",
      "description": "Barrier that blocks vehicle access.",
      "image": "Assets/Structures/Barriers/BarrierCornerRed.prefab",
      "layout": {
        "width": 1,
        "height": 1,
        "thickness": 1,
        "layoutString": "[1]",
        "ports": []
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 1
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "BarrierCrossRed",
      "name": "Barrier Red (cross)",
      "description": "Barrier that blocks vehicle access.",
      "image": "Assets/Structures/Barriers/BarrierCrossRed.prefab",
      "layout": {
        "width": 1,
        "height": 1,
        "thickness": 1,
        "layoutString": "[1]",
        "ports": []
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 1
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "BarrierTeeRed",
      "name": "Barrier Red (tee)",
      "description": "Barrier that blocks vehicle access.",
      "image": "Assets/Structures/Barriers/BarrierTeeRed.prefab",
      "layout": {
        "width": 1,
        "height": 1,
        "thickness": 1,
        "layoutString": "[1]",
        "ports": []
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 1
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "BarrierEndingRed",
      "name": "Barrier Red (ending)",
      "description": "Barrier that blocks vehicle access.",
      "image": "Assets/Structures/Barriers/BarrierEndRed.prefab",
      "layout": {
        "width": 1,
        "height": 1,
        "thickness": 1,
        "layoutString": "[1]",
        "ports": []
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 1
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "RetainingWallRamp4",
      "name": "Retaining ramp (long)",
      "description": "Prevents terrain from collapsing. Walls can be placed below the surface to prevent terrain collapse during mining, or above terrain to aid with dumping operations. The placement elevation is adjustable. Walls will collapse if they hold more than 5 units of height or if they are overfilled.",
      "image": "Assets/Structures/Walls/NewRetainingWall8mRampLong.prefab",
      "layout": {
        "width": 4,
        "height": 2,
        "thickness": 1,
        "layoutString": "(W)(W)(W)(W)\n(W)(W)(W)(W)",
        "ports": []
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_Iron",
          "quantity": 6
        },
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 24
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "RetainingWallStraight4",
      "name": "Retaining wall (long)",
      "description": "Prevents terrain from collapsing. Walls can be placed below the surface to prevent terrain collapse during mining, or above terrain to aid with dumping operations. The placement elevation is adjustable. Walls will collapse if they hold more than 5 units of height or if they are overfilled.",
      "image": "Assets/Structures/Walls/NewRetainingWall8m.prefab",
      "layout": {
        "width": 4,
        "height": 2,
        "thickness": 1,
        "layoutString": "(W)(W)(W)(W)\n(W)(W)(W)(W)",
        "ports": []
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_Iron",
          "quantity": 6
        },
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 24
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "RetainingWallCorner",
      "name": "Retaining wall (corner)",
      "description": "Prevents terrain from collapsing. Walls can be placed below the surface to prevent terrain collapse during mining, or above terrain to aid with dumping operations. The placement elevation is adjustable. Walls will collapse if they hold more than 5 units of height or if they are overfilled.",
      "image": "Assets/Structures/Walls/NewRetainingWallCorner.prefab",
      "layout": {
        "width": 2,
        "height": 2,
        "thickness": 1,
        "layoutString": "(W)(W)\n(W)(W)",
        "ports": []
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_Iron",
          "quantity": 3
        },
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 12
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "RetainingWallCross",
      "name": "Retaining wall (cross)",
      "description": "Prevents terrain from collapsing. Walls can be placed below the surface to prevent terrain collapse during mining, or above terrain to aid with dumping operations. The placement elevation is adjustable. Walls will collapse if they hold more than 5 units of height or if they are overfilled.",
      "image": "Assets/Structures/Walls/NewRetainingWallXing.prefab",
      "layout": {
        "width": 2,
        "height": 2,
        "thickness": 1,
        "layoutString": "(W)(W)\n(W)(W)",
        "ports": []
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_Iron",
          "quantity": 3
        },
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 12
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "RetainingWallTee",
      "name": "Retaining wall (tee)",
      "description": "Prevents terrain from collapsing. Walls can be placed below the surface to prevent terrain collapse during mining, or above terrain to aid with dumping operations. The placement elevation is adjustable. Walls will collapse if they hold more than 5 units of height or if they are overfilled.",
      "image": "Assets/Structures/Walls/NewRetainingWallTee.prefab",
      "layout": {
        "width": 2,
        "height": 2,
        "thickness": 1,
        "layoutString": "(W)(W)\n(W)(W)",
        "ports": []
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_Iron",
          "quantity": 3
        },
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 12
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "SettlementBlank",
      "name": "Square (blank)",
      "description": "",
      "image": "Assets/Structures/Decorations/SettlementDecoration-Blank.prefab",
      "layout": {
        "width": 28,
        "height": 28,
        "thickness": 0,
        "layoutString": "[B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B]\n[B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B]\n[B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B]\n[B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B]\n[B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B]\n[B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B]\n[B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B]\n[B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B]\n[B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B]\n[B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B]\n[B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B]\n[B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B]\n[B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B]\n[B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B]\n[B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B]\n[B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B]\n[B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B]\n[B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B]\n[B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B]\n[B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B]\n[B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B]\n[B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B]\n[B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B]\n[B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B]\n[B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B]\n[B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B]\n[B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B]\n[B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B][B]",
        "ports": []
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConstructionParts",
          "quantity": 200
        },
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 220
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "SolarPanelQuarter",
      "name": "Solar Panel Quarter",
      "description": "Converts sunlight to electricity. Surprisingly, the efficiency depends on how sunny it is.",
      "image": "Assets/SolarPanels/QuarterPanelPoly.prefab",
      "layout": {
        "width": 5,
        "height": 5,
        "thickness": 4,
        "layoutString": "[4][4][4][4][4]\n[4][4][4][4][4]\n[4][4][4][4][4]\n[4][4][4][4][4]\n[4][4][4][4][4]",
        "ports": []
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConstructionParts4",
          "quantity": 3
        },
        {
          "productId": "Product_SolarCell",
          "quantity": 30
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "SolarPanelMonoQuarter",
      "name": "Solar Panel (Mono) Quarter",
      "description": "Solar panels that are made from a single crystal silicon. That makes them more expensive to produce but they provide 25% more energy.",
      "image": "Assets/SolarPanels/QuarterPanelMono.prefab",
      "layout": {
        "width": 5,
        "height": 5,
        "thickness": 4,
        "layoutString": "[4][4][4][4][4]\n[4][4][4][4][4]\n[4][4][4][4][4]\n[4][4][4][4][4]\n[4][4][4][4][4]",
        "ports": []
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConstructionParts4",
          "quantity": 3
        },
        {
          "productId": "Product_SolarCellMono",
          "quantity": 30
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "Counter_IoPortShape_LooseMaterialConveyor",
      "name": "U-shape counter",
      "description": "Connects multiple conveyor belts and counts products between them.",
      "image": "Assets/Logistics/Counter/CounterUShape.prefab",
      "layout": {
        "width": 1,
        "height": 1,
        "thickness": 1,
        "layoutString": "   B~\u002B   \n\u002B~C{1}A~\u002B\n   D~\u002B   ",
        "ports": [
          {
            "id": "B",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "C",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "A",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "D",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          }
        ]
      },
      "workers": 0,
      "price": [],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "Zipper_IoPortShape_LooseMaterialConveyor_small",
      "name": "U-shape balancer (small)",
      "description": "Four way balancer.",
      "image": "Assets/Base/MiniZippers/ConnectorUShape.prefab",
      "layout": {
        "width": 1,
        "height": 1,
        "thickness": 1,
        "layoutString": "   B~\u002B   \n\u002B~C|1|A~\u002B\n   D~\u002B   ",
        "ports": [
          {
            "id": "B",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "C",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "A",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "D",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          }
        ]
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConstructionParts2",
          "quantity": 8
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "Zipper_IoPortShape_LooseMaterialConveyor_large",
      "name": "U-shape balancer (large)",
      "description": "Twelve way balancer.",
      "image": "Assets/Logistics/Balancers/BalancerUShapeLarge.prefab",
      "layout": {
        "width": 3,
        "height": 3,
        "thickness": 1,
        "layoutString": "   ~J\u002B~K\u002B~L\u002B   \n~D\u002B|1||1||1|~A\u002B\n~E\u002B|1||1||1|~B\u002B\n~F\u002B|1||1||1|~C\u002B\n   ~G\u002B~H\u002B~I\u002B   ",
        "ports": [
          {
            "id": "J",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 2,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "K",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 2,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "L",
            "type": "any",
            "pos": {
              "x": 2,
              "y": 2,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "D",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 2,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "A",
            "type": "any",
            "pos": {
              "x": 2,
              "y": 2,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "E",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 1,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "B",
            "type": "any",
            "pos": {
              "x": 2,
              "y": 1,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "F",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "C",
            "type": "any",
            "pos": {
              "x": 2,
              "y": 0,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "G",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          },
          {
            "id": "H",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          },
          {
            "id": "I",
            "type": "any",
            "pos": {
              "x": 2,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          }
        ]
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConstructionParts2",
          "quantity": 8
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "Zipper_IoPortShape_LooseMaterialConveyor_long",
      "name": "U-shape balancer (long)",
      "description": "Twelve way balancer (long).",
      "image": "Assets/Logistics/Balancers/BalancerUShapeLong.prefab",
      "layout": {
        "width": 2,
        "height": 4,
        "thickness": 1,
        "layoutString": "   ~K\u002B~L\u002B   \n~H\u002B|1||1|~A\u002B\n~G\u002B|1||1|~B\u002B\n~F\u002B|1||1|~C\u002B\n~E\u002B|1||1|~D\u002B\n   ~J\u002B~I\u002B   ",
        "ports": [
          {
            "id": "K",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 3,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "L",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 3,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "H",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 3,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "A",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 3,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "G",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 2,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "B",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 2,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "F",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 1,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "C",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 1,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "E",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "D",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 0,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "J",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          },
          {
            "id": "I",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          }
        ]
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConstructionParts2",
          "quantity": 8
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "Sorter_IoPortShape_Pipe",
      "name": "Pipe sorter",
      "description": "Allows to sort selected products to a separate port.",
      "image": "Assets/Logistics/Balancers/SorterFluid.prefab",
      "layout": {
        "width": 2,
        "height": 2,
        "thickness": 1,
        "layoutString": "A@\u003E|1||1|\u003E@X\n   {1}|1|   \n      v@S   ",
        "ports": [
          {
            "id": "A",
            "type": "input",
            "pos": {
              "x": 0,
              "y": 1,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "X",
            "type": "output",
            "pos": {
              "x": 1,
              "y": 1,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "S",
            "type": "output",
            "pos": {
              "x": 1,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          }
        ]
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConstructionParts2",
          "quantity": 12
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "Counter_IoPortShape_Pipe",
      "name": "Pipe counter",
      "description": "Connects multiple pipes and counts products between them.",
      "image": "Assets/Logistics/Counter/CounterFluid.prefab",
      "layout": {
        "width": 1,
        "height": 1,
        "thickness": 1,
        "layoutString": "   B@\u002B   \n\u002B@C{1}A@\u002B\n   D@\u002B   ",
        "ports": [
          {
            "id": "B",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "C",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "A",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "D",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          }
        ]
      },
      "workers": 0,
      "price": [],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "Zipper_IoPortShape_Pipe_small",
      "name": "Pipe balancer (small)",
      "description": "Four way balancer.",
      "image": "Assets/Base/MiniZippers/ConnectorFluid.prefab",
      "layout": {
        "width": 1,
        "height": 1,
        "thickness": 1,
        "layoutString": "   B@\u002B   \n\u002B@C|1|A@\u002B\n   D@\u002B   ",
        "ports": [
          {
            "id": "B",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "C",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "A",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "D",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          }
        ]
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConstructionParts2",
          "quantity": 8
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "Zipper_IoPortShape_Pipe_large",
      "name": "Pipe balancer (large)",
      "description": "Twelve way balancer.",
      "image": "Assets/Logistics/Balancers/BalancerFluidLarge.prefab",
      "layout": {
        "width": 3,
        "height": 3,
        "thickness": 1,
        "layoutString": "   @J\u002B@K\u002B@L\u002B   \n@D\u002B|1||1||1|@A\u002B\n@E\u002B|1||1||1|@B\u002B\n@F\u002B|1||1||1|@C\u002B\n   @G\u002B@H\u002B@I\u002B   ",
        "ports": [
          {
            "id": "J",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 2,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "K",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 2,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "L",
            "type": "any",
            "pos": {
              "x": 2,
              "y": 2,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "D",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 2,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "A",
            "type": "any",
            "pos": {
              "x": 2,
              "y": 2,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "E",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 1,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "B",
            "type": "any",
            "pos": {
              "x": 2,
              "y": 1,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "F",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "C",
            "type": "any",
            "pos": {
              "x": 2,
              "y": 0,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "G",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          },
          {
            "id": "H",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          },
          {
            "id": "I",
            "type": "any",
            "pos": {
              "x": 2,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          }
        ]
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConstructionParts2",
          "quantity": 8
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "Zipper_IoPortShape_Pipe_long",
      "name": "Pipe balancer (long)",
      "description": "Twelve way balancer (long).",
      "image": "Assets/Logistics/Balancers/BalancerFluidLong.prefab",
      "layout": {
        "width": 2,
        "height": 4,
        "thickness": 1,
        "layoutString": "   @K\u002B@L\u002B   \n@H\u002B|1||1|@A\u002B\n@G\u002B|1||1|@B\u002B\n@F\u002B|1||1|@C\u002B\n@E\u002B|1||1|@D\u002B\n   @J\u002B@I\u002B   ",
        "ports": [
          {
            "id": "K",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 3,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "L",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 3,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "H",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 3,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "A",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 3,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "G",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 2,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "B",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 2,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "F",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 1,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "C",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 1,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "E",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "D",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 0,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "J",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          },
          {
            "id": "I",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          }
        ]
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConstructionParts2",
          "quantity": 8
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "Counter_IoPortShape_MoltenMetalChannel",
      "name": "Molten counter",
      "description": "Connects multiple channels and counts products between them.",
      "image": "Assets/Logistics/Counter/CounterMolten.prefab",
      "layout": {
        "width": 1,
        "height": 1,
        "thickness": 1,
        "layoutString": "   B\u0027\u002B   \n\u002B\u0027C{1}A\u0027\u002B\n   D\u0027\u002B   ",
        "ports": [
          {
            "id": "B",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "C",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "A",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "D",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          }
        ]
      },
      "workers": 0,
      "price": [],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "Zipper_IoPortShape_MoltenMetalChannel_small",
      "name": "Molten balancer (small)",
      "description": "Four way balancer.",
      "image": "Assets/Base/MiniZippers/ConnectorMolten.prefab",
      "layout": {
        "width": 1,
        "height": 1,
        "thickness": 1,
        "layoutString": "   B\u0027\u002B   \n\u002B\u0027C|1|A\u0027\u002B\n   D\u0027\u002B   ",
        "ports": [
          {
            "id": "B",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "C",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "A",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "D",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          }
        ]
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConstructionParts2",
          "quantity": 8
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "Zipper_IoPortShape_MoltenMetalChannel_large",
      "name": "Molten balancer (large)",
      "description": "Twelve way balancer.",
      "image": "TODO",
      "layout": {
        "width": 3,
        "height": 3,
        "thickness": 1,
        "layoutString": "   \u0027J\u002B\u0027K\u002B\u0027L\u002B   \n\u0027D\u002B|1||1||1|\u0027A\u002B\n\u0027E\u002B|1||1||1|\u0027B\u002B\n\u0027F\u002B|1||1||1|\u0027C\u002B\n   \u0027G\u002B\u0027H\u002B\u0027I\u002B   ",
        "ports": [
          {
            "id": "J",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 2,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "K",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 2,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "L",
            "type": "any",
            "pos": {
              "x": 2,
              "y": 2,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "D",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 2,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "A",
            "type": "any",
            "pos": {
              "x": 2,
              "y": 2,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "E",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 1,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "B",
            "type": "any",
            "pos": {
              "x": 2,
              "y": 1,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "F",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "C",
            "type": "any",
            "pos": {
              "x": 2,
              "y": 0,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "G",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          },
          {
            "id": "H",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          },
          {
            "id": "I",
            "type": "any",
            "pos": {
              "x": 2,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          }
        ]
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConstructionParts2",
          "quantity": 8
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "Zipper_IoPortShape_MoltenMetalChannel_long",
      "name": "Molten balancer (long)",
      "description": "Twelve way balancer (long).",
      "image": "TODO",
      "layout": {
        "width": 2,
        "height": 4,
        "thickness": 1,
        "layoutString": "   \u0027K\u002B\u0027L\u002B   \n\u0027H\u002B|1||1|\u0027A\u002B\n\u0027G\u002B|1||1|\u0027B\u002B\n\u0027F\u002B|1||1|\u0027C\u002B\n\u0027E\u002B|1||1|\u0027D\u002B\n   \u0027J\u002B\u0027I\u002B   ",
        "ports": [
          {
            "id": "K",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 3,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "L",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 3,
              "z": 0
            },
            "dir": "\u002BY"
          },
          {
            "id": "H",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 3,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "A",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 3,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "G",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 2,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "B",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 2,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "F",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 1,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "C",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 1,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "E",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-X"
          },
          {
            "id": "D",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 0,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "J",
            "type": "any",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          },
          {
            "id": "I",
            "type": "any",
            "pos": {
              "x": 1,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          }
        ]
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConstructionParts2",
          "quantity": 8
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "ShipyardAdvanced",
      "name": "Shipyard II",
      "description": "Serves to refuel, repair, and modify our ship. Also handles loading and unloading ship\u0027s cargo. If a truck happens to have some cargo that cannot be delivered anywhere else, it can be delivered here.",
      "image": "Assets/Base/Buildings/Shipyard/ShipyardT2.prefab",
      "layout": {
        "width": 35,
        "height": 86,
        "thickness": 9,
        "layoutString": "                                                                                                            \n                                                                                                            \n                                                                                                            \n~~~~~~~~~~~~                                                                                                \n~~~~~~~~~~~~~~~                                                                                             \n~~~~~~~~~~~~~~~~~~                                                                                          \n~~~~~~~~~~~~~~~~~~~~~                                                                                       \n~~~~~~~~~~~~~~~~~~~~~~~~                                                                                    \n~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                                 \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                              \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                           \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                        \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                     \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                  \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                               \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                            \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{9!{9!{9!{9!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{9!{9!{9!{9!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{9!{9!{9!{9!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{9!{9!{9!{9!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)\u003E~X\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{9!{9!{9!{9!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)\u003E@Y\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{9!{9!{9!{9!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)\u003E#Z\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)\u003C@A\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                            \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                               \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                  \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                     \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                        \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                           \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                              \n~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                                 \n~~~~~~~~~~~~~~~~~~~~~~~~                                                                                    \n~~~~~~~~~~~~~~~~~~~~~                                                                                       \n~~~~~~~~~~~~~~~~~~                                                                                          \n~~~~~~~~~~~~~~~                                                                                             \n~~~~~~~~~~~~                                                                                                \n                                                                                                            \n                                                                                                            \n                                                                                                            ",
        "ports": [
          {
            "id": "X",
            "type": "output",
            "pos": {
              "x": 34,
              "y": 31,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "Y",
            "type": "output",
            "pos": {
              "x": 34,
              "y": 30,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "Z",
            "type": "output",
            "pos": {
              "x": 34,
              "y": 29,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "A",
            "type": "input",
            "pos": {
              "x": 34,
              "y": 18,
              "z": 0
            },
            "dir": "\u002BX"
          }
        ]
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConstructionParts",
          "quantity": 600
        },
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 800
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "FishingDock",
      "name": "Fishing Dock",
      "description": "A simple, wooden structure ideal for early-game island settlements, catching sardines and anchovies. It requires no inputs or outputs, relying on small boats and manual labor. Optional bait, like meat trimmings, boosts catch rates, enhancing early resource gathering.",
      "image": "Assets/Agriculture/Buildings/FishingDock.prefab",
      "layout": {
        "width": 15,
        "height": 16,
        "thickness": 4,
        "layoutString": "~2!{2!{2!{2!                                 \n~2!{2!{2!{2!                                 \n~2!{2!{2!{2!                                 \n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)\n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)\n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)\n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)\n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)\n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)\n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)\n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)\n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)\n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)\n~2!{2!{2!{2!                                 \n~2!{2!{2!{2!                                 \n~2!{2!{2!{2!                                 ",
        "ports": []
      },
      "workers": 12,
      "price": [
        {
          "productId": "Product_ConstructionParts",
          "quantity": 20
        },
        {
          "productId": "Product_Wood",
          "quantity": 30
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "FishingDockII",
      "name": "Fishing Dock II",
      "description": "An upgraded, land-based facility that catches mackerel and cod while retaining access to lower-tier fish like sardines and anchovies. It introduces conveyor belt integration for efficient fish transport via input and output ports. Multiple bait options, including anchovies, sardines, or meat trimmings, significantly increase yields, supporting mid-game logistics.",
      "image": "Assets/Agriculture/Buildings/FishingDock2.prefab",
      "layout": {
        "width": 15,
        "height": 16,
        "thickness": 4,
        "layoutString": "~2!{2!{2!{2!                                    \n~2!{2!{2!{2!                                    \n~2!{2!{2!{2!                                    \n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)   \n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)   \n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)   \n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)   \n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)   \n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)\u003E#A\n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)\u003E#B\n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)\u003C#C\n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)\u003C~D\n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)   \n~2!{2!{2!{2!                                    \n~2!{2!{2!{2!                                    \n~2!{2!{2!{2!                                    ",
        "ports": [
          {
            "id": "A",
            "type": "output",
            "pos": {
              "x": 14,
              "y": 7,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "B",
            "type": "output",
            "pos": {
              "x": 14,
              "y": 6,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "C",
            "type": "input",
            "pos": {
              "x": 14,
              "y": 5,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "D",
            "type": "input",
            "pos": {
              "x": 14,
              "y": 4,
              "z": 0
            },
            "dir": "\u002BX"
          }
        ]
      },
      "workers": 24,
      "price": [
        {
          "productId": "Product_ConstructionParts2",
          "quantity": 20
        },
        {
          "productId": "Product_Steel",
          "quantity": 30
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "FishingDockIII",
      "name": "Fishing Dock III",
      "description": "A high-tech facility that catches premium tuna and swordfish, alongside all lower-tier fish, with enhanced efficiency. Advanced automation and AI reduce worker requirements, streamlining processing. It supports multiple bait types for maximum catch rates and integrates seamlessly with conveyor systems for optimized late-game production.",
      "image": "Assets/Agriculture/Buildings/FishingDock3.prefab",
      "layout": {
        "width": 15,
        "height": 16,
        "thickness": 4,
        "layoutString": "~2!{2!{2!{2!                                    \n~2!{2!{2!{2!                                    \n~2!{2!{2!{2!                                    \n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)   \n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)   \n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)   \n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)   \n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)   \n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)\u003E#A\n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)\u003E#B\n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)\u003C#C\n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)\u003C~D\n~2!{2!{2!{2!{2!{2!{2!{4!{4!{4!{4!{4!{4!(4)(4)   \n~2!{2!{2!{2!                                    \n~2!{2!{2!{2!                                    \n~2!{2!{2!{2!                                    ",
        "ports": [
          {
            "id": "A",
            "type": "output",
            "pos": {
              "x": 14,
              "y": 7,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "B",
            "type": "output",
            "pos": {
              "x": 14,
              "y": 6,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "C",
            "type": "input",
            "pos": {
              "x": 14,
              "y": 5,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "D",
            "type": "input",
            "pos": {
              "x": 14,
              "y": 4,
              "z": 0
            },
            "dir": "\u002BX"
          }
        ]
      },
      "workers": 18,
      "price": [
        {
          "productId": "Product_ConstructionParts3",
          "quantity": 20
        },
        {
          "productId": "Product_Aluminum",
          "quantity": 30
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "SynfuelGenerator",
      "name": "Synfuel Generator",
      "description": "The Synfuel Generator harnesses synfuel liquid to produce a robust 12 MW of electricity, outperforming traditional fuel-based generators. It consumes synfuel efficiently, generating minimal exhaust, and integrates seamlessly into power grids via a compact layout. This high-output generator elevates factory energy systems, ideal for scaling complex operations.",
      "image": "Assets/Machines/SynfuelGenerator.prefab",
      "layout": {
        "width": 8,
        "height": 3,
        "thickness": 4,
        "layoutString": "[3][3][3][3][4][4][4][4]\n[3][3][3][3][4][4][4][4]\n[3][3][3][3][4][4][4][4]\nF@^               v@S   ",
        "ports": [
          {
            "id": "F",
            "type": "input",
            "pos": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          },
          {
            "id": "S",
            "type": "output",
            "pos": {
              "x": 6,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          }
        ]
      },
      "workers": 3,
      "price": [
        {
          "productId": "Product_ConstructionParts4",
          "quantity": 35
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "TrainStationFuelSynfuel",
      "name": "Synfuel fuel module",
      "description": "Fuel module for refueling locomotives with synthetic fuel.",
      "image": "Assets/Base/Trains/Stations/StationFuelDiesel.prefab",
      "layout": {
        "width": 5,
        "height": 7,
        "thickness": 5,
        "layoutString": "         vA@   \n[5][5][5][5][5]\n[5][5][5][5][5]\n[5][5][5][5][5]\n[5][5][5][5][5]\n[5][5][5][5][5]\n[4][4][4][4][4]\n[4][4][4][4][4]",
        "ports": [
          {
            "id": "A",
            "type": "input",
            "pos": {
              "x": 3,
              "y": 6,
              "z": 0
            },
            "dir": "\u002BY"
          }
        ]
      },
      "workers": 1,
      "price": [
        {
          "productId": "Product_ConstructionParts3",
          "quantity": 20
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "FuelStationSynfuelT4",
      "name": "Fuel station IV (Synfuel)",
      "description": "Trucks assigned to a fuel station will automatically refuel excavators and tree harvesters at their working site so they don\u0027t waste their time going for fuel on their own.",
      "image": "Assets/Core/FuelStations/FuelStation4S.prefab",
      "layout": {
        "width": 6,
        "height": 7,
        "thickness": 3,
        "layoutString": "D1DD1D(3)(3)D1DD1D\nD1DD1D(3)(3)D1DD1D\nD1DD1D(3)(3)D1DD1D\nD1DD1D(3)(3)D1DD1D\nD1DD1D(3)(3)D1DD1D\nD1DD1D(3)(3)D1DD1D\nD1DD1D(3)(3)D1DD1D\n         ^@A      ",
        "ports": [
          {
            "id": "A",
            "type": "input",
            "pos": {
              "x": 3,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          }
        ]
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConstructionParts3",
          "quantity": 100
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "FuelStationHydrogenT4",
      "name": "Fuel Station IV (Hydrogen)",
      "description": "Trucks assigned to a fuel station will automatically refuel excavators and tree harvesters at their working site so they don\u0027t waste their time going for fuel on their own.",
      "image": "Assets/Core/FuelStations/FuelStation4H.prefab",
      "layout": {
        "width": 6,
        "height": 7,
        "thickness": 3,
        "layoutString": "D1DD1D(3)(3)D1DD1D\nD1DD1D(3)(3)D1DD1D\nD1DD1D(3)(3)D1DD1D\nD1DD1D(3)(3)D1DD1D\nD1DD1D(3)(3)D1DD1D\nD1DD1D(3)(3)D1DD1D\nD1DD1D(3)(3)D1DD1D\n         ^@A      ",
        "ports": [
          {
            "id": "A",
            "type": "input",
            "pos": {
              "x": 3,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          }
        ]
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConstructionParts3",
          "quantity": 100
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "FuelStationT4",
      "name": "Fuel station IV",
      "description": "Trucks assigned to a fuel station will automatically refuel excavators and tree harvesters at their working site so they don\u0027t waste their time going for fuel on their own. Provides increased storage and refueling rate compared to the previous tier.",
      "image": "Assets/Core/FuelStations/FuelStation4.prefab",
      "layout": {
        "width": 6,
        "height": 7,
        "thickness": 3,
        "layoutString": "D1DD1D(3)(3)D1DD1D\nD1DD1D(3)(3)D1DD1D\nD1DD1D(3)(3)D1DD1D\nD1DD1D(3)(3)D1DD1D\nD1DD1D(3)(3)D1DD1D\nD1DD1D(3)(3)D1DD1D\nD1DD1D(3)(3)D1DD1D\n         ^@A      ",
        "ports": [
          {
            "id": "A",
            "type": "input",
            "pos": {
              "x": 3,
              "y": 0,
              "z": 0
            },
            "dir": "-Y"
          }
        ]
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConstructionParts3",
          "quantity": 100
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "CargoDepotModuleUnitT4",
      "name": "Unit module (XL)",
      "description": "Cargo depot module for transferring units of products (such as construction parts). It can be built in any empty slot of a cargo depot. Unloads cargo 600% faster comparing to the basic module.",
      "image": "Assets/Base/Buildings/CargoDepot/Module_Countable_T3.prefab",
      "layout": {
        "width": 10,
        "height": 5,
        "thickness": 4,
        "layoutString": "[3][3][3][3][3][3][3][3][3][3]   \n[4][4][4][4][4][4][4][4][4][4]\u002B#X\n[4][4][4][4][4][4][4][4][4][4]\u002B#Y\n[4][4][4][4][4][4][4][4][4][4]\u002B#Z\n[3][3][3][3][3][3][3][3][3][3]   ",
        "ports": [
          {
            "id": "X",
            "type": "any",
            "pos": {
              "x": 9,
              "y": 3,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "Y",
            "type": "any",
            "pos": {
              "x": 9,
              "y": 2,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "Z",
            "type": "any",
            "pos": {
              "x": 9,
              "y": 1,
              "z": 0
            },
            "dir": "\u002BX"
          }
        ]
      },
      "workers": 6,
      "price": [
        {
          "productId": "Product_ConstructionParts3",
          "quantity": 150
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "CargoDepotModuleLooseT4",
      "name": "Loose module (XL)",
      "description": "Cargo depot module for transferring loose materials (such as coal). It can be built in any empty slot of a cargo depot. Unloads cargo 600% faster comparing to the basic module.",
      "image": "Assets/Base/Buildings/CargoDepot/Module_Loose_T3.prefab",
      "layout": {
        "width": 10,
        "height": 5,
        "thickness": 6,
        "layoutString": "[4][4][4][4][4][4][4][4][5][4]   \n[4][4][4][4][4][4][4][4][6][5]\u002B~X\n[4][4][4][4][4][4][4][4][6][5]\u002B~Y\n[4][4][4][4][4][4][4][4][6][5]\u002B~Z\n[4][4][4][4][4][4][4][4][5][4]   ",
        "ports": [
          {
            "id": "X",
            "type": "any",
            "pos": {
              "x": 9,
              "y": 3,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "Y",
            "type": "any",
            "pos": {
              "x": 9,
              "y": 2,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "Z",
            "type": "any",
            "pos": {
              "x": 9,
              "y": 1,
              "z": 0
            },
            "dir": "\u002BX"
          }
        ]
      },
      "workers": 6,
      "price": [
        {
          "productId": "Product_ConstructionParts3",
          "quantity": 150
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "CargoDepotModuleFluidT4",
      "name": "Fluid module (XL)",
      "description": "Cargo depot module for transferring fluid materials (such as oil). It can be built in any empty slot of a cargo depot. Unloads cargo 600% faster comparing to the basic module.",
      "image": "Assets/Base/Buildings/CargoDepot/Module_Gas_T3.prefab",
      "layout": {
        "width": 10,
        "height": 5,
        "thickness": 6,
        "layoutString": "[5][5][5][5][5][5][5][5][5][4]   \n[5][5][5][5][5][5][5][5][6][4]\u002B@X\n[5][5][5][5][5][5][5][5][6][4]\u002B@Y\n[5][5][5][5][5][5][5][5][6][4]\u002B@Z\n[5][5][5][5][5][5][5][5][5][4]   ",
        "ports": [
          {
            "id": "X",
            "type": "any",
            "pos": {
              "x": 9,
              "y": 3,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "Y",
            "type": "any",
            "pos": {
              "x": 9,
              "y": 2,
              "z": 0
            },
            "dir": "\u002BX"
          },
          {
            "id": "Z",
            "type": "any",
            "pos": {
              "x": 9,
              "y": 1,
              "z": 0
            },
            "dir": "\u002BX"
          }
        ]
      },
      "workers": 6,
      "price": [
        {
          "productId": "Product_ConstructionParts3",
          "quantity": 150
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "CargoDepotT6",
      "name": "Cargo depot (12)",
      "description": "Once built, a repaired cargo ship can dock here and transfer its cargo via attached cargo depot modules.",
      "image": "Assets/Core/CargoShips/CargoDepotT6.prefab",
      "layout": {
        "width": 32,
        "height": 91,
        "thickness": 4,
        "layoutString": "                                                                                                   \n                                                                                                   \n                                                                                                   \n~~~~~~~~~~~~                                                                                       \n~~~~~~~~~~~~~~~                                                                                    \n~~~~~~~~~~~~~~~~~~                                                                                 \n~~~~~~~~~~~~~~~~~~~~~                                                                              \n~~~~~~~~~~~~~~~~~~~~~~~~                                                                           \n~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                        \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                     \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                  \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                               \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                            \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                         \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                      \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)\u003C@A\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                      \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                         \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                            \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                               \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                  \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                     \n~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                        \n~~~~~~~~~~~~~~~~~~~~~~~~                                                                           \n~~~~~~~~~~~~~~~~~~~~~                                                                              \n~~~~~~~~~~~~~~~~~~                                                                                 \n~~~~~~~~~~~~~~~                                                                                    \n~~~~~~~~~~~~                                                                                       \n                                                                                                   \n                                                                                                   \n                                                                                                   ",
        "ports": [
          {
            "id": "A",
            "type": "input",
            "pos": {
              "x": 31,
              "y": 15,
              "z": 0
            },
            "dir": "\u002BX"
          }
        ]
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConstructionParts2",
          "quantity": 500
        },
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 800
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    },
    {
      "id": "CargoDepotT5",
      "name": "Cargo depot (10)",
      "description": "Once built, a repaired cargo ship can dock here and transfer its cargo via attached cargo depot modules.",
      "image": "Assets/Core/CargoShips/CargoDepotT5.prefab",
      "layout": {
        "width": 32,
        "height": 91,
        "thickness": 4,
        "layoutString": "                                                                                                   \n                                                                                                   \n                                                                                                   \n~~~~~~~~~~~~                                                                                       \n~~~~~~~~~~~~~~~                                                                                    \n~~~~~~~~~~~~~~~~~~                                                                                 \n~~~~~~~~~~~~~~~~~~~~~                                                                              \n~~~~~~~~~~~~~~~~~~~~~~~~                                                                           \n~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                        \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                     \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                  \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                               \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                            \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                         \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                      \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)\u003C@A\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!{4!(4)(4)   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                   \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                      \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                         \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                            \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                               \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                  \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                     \n~~~~~~~~~~~~~~~~~~~~~~~~~~~                                                                        \n~~~~~~~~~~~~~~~~~~~~~~~~                                                                           \n~~~~~~~~~~~~~~~~~~~~~                                                                              \n~~~~~~~~~~~~~~~~~~                                                                                 \n~~~~~~~~~~~~~~~                                                                                    \n~~~~~~~~~~~~                                                                                       \n                                                                                                   \n                                                                                                   \n                                                                                                   ",
        "ports": [
          {
            "id": "A",
            "type": "input",
            "pos": {
              "x": 31,
              "y": 15,
              "z": 0
            },
            "dir": "\u002BX"
          }
        ]
      },
      "workers": 0,
      "price": [
        {
          "productId": "Product_ConstructionParts2",
          "quantity": 400
        },
        {
          "productId": "Product_ConcreteSlab",
          "quantity": 700
        }
      ],
      "tags": [],
      "buildTimePerProductSeconds": 0.200195313
    }
  ],
  "farms": [],
  "crops": [],
  "foods": [
    {
      "id": "FoodCannedFish",
      "productId": "FoodCanFish",
      "categoryId": "FoodCategory_Protein",
      "consumedPerHundredPopsPerMonth": 3.54980469,
      "unityProvided": 0.25
    }
  ],
  "foodCategories": [],
  "farmResearch": [],
  "mods": null
};

export default GameData;