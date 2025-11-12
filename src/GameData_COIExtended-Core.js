const GameData = {
  "metadataJs": {
    "version": "Update 3",
    "lastUpdated": "11/12/2025",
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
      "fertilizer": null,
      "canBeMined": false
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
      "fertilizer": null,
      "canBeMined": false
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
      "fertilizer": null,
      "canBeMined": false
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
      "fertilizer": null,
      "canBeMined": false
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
      "fertilizer": null,
      "canBeMined": false
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
      "fertilizer": null,
      "canBeMined": false
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
      "fertilizer": null,
      "canBeMined": false
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
      "fertilizer": null,
      "canBeMined": false
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
      "fertilizer": null,
      "canBeMined": false
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
      "fertilizer": null,
      "canBeMined": false
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
      "fertilizer": null,
      "canBeMined": false
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
      "fertilizer": null,
      "canBeMined": false
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
      "fertilizer": null,
      "canBeMined": false
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
      "fertilizer": null,
      "canBeMined": false
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
      "fertilizer": null,
      "canBeMined": false
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
      "fertilizer": null,
      "canBeMined": false
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
      "fertilizer": null,
      "canBeMined": false
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
  "research": [
    {
      "id": "ResearchRetainingWalls",
      "name": "Retaining walls",
      "description": "Prevents terrain from collapsing. Walls can be placed below the surface to prevent terrain collapse during mining, or above terrain to aid with dumping operations. The placement elevation is adjustable. Walls will collapse if they hold more than 5 units of height or if they are overfilled.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Structures/Icons/RetainingWallStraight1.png",
      "gridPosition": {
        "x": 28,
        "y": 7
      },
      "unlocks": [
        {
          "type": "building",
          "id": "RetainingWallStraight1",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "RetainingWallStraight4",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "RetainingWallCorner",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "RetainingWallTee",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "RetainingWallCross",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "RetainingWallStraight2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "RetainingWallRamp2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "RetainingWallRamp4",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "RetainingWallRamp2Shallow",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "RetainingWallRamp2ShallowOffset",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchConcreteAdvanced"
      ],
      "researchDurationMonths": 16,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchVehicleCapIncrease2",
      "name": "Vehicles management I",
      "description": "Increases vehicle limit by 30.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Base/Icons/VehicleLimitIncrease.svg",
      "gridPosition": {
        "x": 44,
        "y": 23
      },
      "unlocks": [
        {
          "type": "building",
          "id": "BarrierStraight1",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "BarrierCorner",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "BarrierCross",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "BarrierEnd",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "BarrierTee",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "BarrierCrossFresh",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "BarrierCornerFresh",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "BarrierEndingFresh",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "BarrierStraight1Fresh",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "BarrierTeeFresh",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "BarrierCrossRed",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "BarrierCornerRed",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "BarrierEndingRed",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "BarrierStraight1Red",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "BarrierTeeRed",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "BarrierCrossWashed",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "BarrierCornerWashed",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "BarrierEndingWashed",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "BarrierStraight1Washed",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "BarrierTeeWashed",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchResearchLab2"
      ],
      "researchDurationMonths": 36,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchIronSmeltingScrap",
      "name": "Iron smelting (from scrap)",
      "description": "Unlocks the ability to produce iron from scrap metal, utilizing smelting furnaces and casting machines for resource-efficient production.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Unity/Generated/Icons/LayoutEntity/SmeltingFurnaceT1.png",
      "gridPosition": {
        "x": 0,
        "y": 10
      },
      "unlocks": [
        {
          "type": "machine",
          "id": "SmeltingFurnaceT1",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_IronScrap",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Coal",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_MoltenIron",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Exhaust",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "IronSmeltingT1Scrap",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "machine",
          "id": "Caster",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Wood",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Coal",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Exhaust",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "CharcoalBurning",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "machine",
          "id": "CharcoalMaker",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_MoltenIron",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Iron",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "IronCasting",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "other",
          "id": "MoltenMetalChannel",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "MiniZip_IoPortShape_MoltenMetalChannel",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "machine",
          "id": "SmokeStack",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Exhaust",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Virtual_PollutedAir",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "SmokeStackExhaust",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchVehicleAndMining"
      ],
      "researchDurationMonths": 0,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchTransportsBalancing",
      "name": "Transports balancing",
      "description": "Unlocks advanced transport management tools, allowing precise control over input/output priorities and ratios for optimized conveyor and pipe networks.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Unity/Generated/Icons/LayoutEntity/Zipper_IoPortShape_FlatConveyor.png",
      "gridPosition": {
        "x": 28,
        "y": 11
      },
      "unlocks": [
        {
          "type": "building",
          "id": "Zipper_IoPortShape_FlatConveyor",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "Zipper_IoPortShape_LooseMaterialConveyor",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "Zipper_IoPortShape_Pipe",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "Zipper_IoPortShape_MoltenMetalChannel",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "Zipper_IoPortShape_FlatConveyor_small",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "Zipper_IoPortShape_LooseMaterialConveyor_small",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "Zipper_IoPortShape_Pipe_small",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "Zipper_IoPortShape_MoltenMetalChannel_small",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "Zipper_IoPortShape_FlatConveyor_large",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "Zipper_IoPortShape_LooseMaterialConveyor_large",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "Zipper_IoPortShape_Pipe_large",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "Zipper_IoPortShape_MoltenMetalChannel_large",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "Zipper_IoPortShape_FlatConveyor_long",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "Zipper_IoPortShape_LooseMaterialConveyor_long",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "Zipper_IoPortShape_Pipe_long",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "Zipper_IoPortShape_MoltenMetalChannel_long",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchConveyorBelts"
      ],
      "researchDurationMonths": 30,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchConveyorBeltsT3",
      "name": "Conveyor belts III",
      "description": "Introduces advanced conveyor systems with significantly increased capacity, optimizing material transport for high-demand production lines.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Unity/Generated/Icons/Transport/FlatConveyorT3.png",
      "gridPosition": {
        "x": 116,
        "y": 10
      },
      "unlocks": [
        {
          "type": "other",
          "id": "FlatConveyorT3",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "other",
          "id": "LooseMaterialConveyorT3",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "other",
          "id": "PipeT4",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchResearchLab4"
      ],
      "researchDurationMonths": 120,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchConveyorBeltsT2",
      "name": "Conveyor belts II",
      "description": "Enhances conveyor belts with improved mechanics, delivering higher throughput for more efficient transport of goods across your facilities.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Unity/Generated/Icons/Transport/FlatConveyorT2.png",
      "gridPosition": {
        "x": 56,
        "y": 15
      },
      "unlocks": [
        {
          "type": "other",
          "id": "FlatConveyorT2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "other",
          "id": "LooseMaterialConveyorT2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchCp3Packing"
      ],
      "researchDurationMonths": 60,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchConveyorBelts",
      "name": "Conveyor belts",
      "description": "Unlocks basic conveyor belts for direct, automated connections between machines, ensuring smooth and continuous material flow.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Unity/Generated/Icons/Transport/FlatConveyorT1.png",
      "gridPosition": {
        "x": 24,
        "y": 15
      },
      "unlocks": [
        {
          "type": "other",
          "id": "FlatConveyorT1",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "MiniZip_IoPortShape_FlatConveyor",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "other",
          "id": "LooseMaterialConveyor",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "MiniZip_IoPortShape_LooseMaterialConveyor",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchCp2Packing"
      ],
      "researchDurationMonths": 24,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchPipeTransportsT3",
      "name": "Pipes III",
      "description": "Harnesses innovative alloys to deliver highly efficient pipes, offering superior fluid transport capabilities for large-scale industrial needs.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Unity/Generated/Icons/Transport/PipeT3.png",
      "gridPosition": {
        "x": 76,
        "y": 27
      },
      "unlocks": [
        {
          "type": "other",
          "id": "PipeT3",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchResearchLab3"
      ],
      "researchDurationMonths": 84,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchPipeTransports",
      "name": "Pipes",
      "description": "Enables the use of pipes for seamless, high-volume fluid transport, eliminating the need for cumbersome truck-based logistics.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Unity/Generated/Icons/Transport/PipeT1.png",
      "gridPosition": {
        "x": 0,
        "y": 35
      },
      "unlocks": [
        {
          "type": "other",
          "id": "PipeT1",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "MiniZip_IoPortShape_Pipe",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [],
      "researchDurationMonths": 0,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchPipeTransportsT2",
      "name": "Pipes II",
      "description": "Upgrades pipes with advanced materials, increasing pressure and diameter to significantly boost fluid throughput for more efficient operations.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Unity/Generated/Icons/Transport/PipeT2.png",
      "gridPosition": {
        "x": 40,
        "y": 15
      },
      "unlocks": [
        {
          "type": "other",
          "id": "PipeT2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "machine",
          "id": "SmokeStackLarge",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchResearchLab2"
      ],
      "researchDurationMonths": 36,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchVehicleAssembly3H",
      "name": "Hydrogen mega vehicles",
      "description": "",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Unity/Generated/Icons/Vehicle/TruckT3LooseH.png",
      "gridPosition": {
        "x": 156,
        "y": 4
      },
      "unlocks": [
        {
          "type": "vehicle",
          "id": "TruckT3LooseH",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "vehicle",
          "id": "TruckT3FluidH",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "vehicle",
          "id": "ExcavatorT3H",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchVehicleAssembly3"
      ],
      "researchDurationMonths": 168,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchVehicleAssembly3",
      "name": "Mega vehicles",
      "description": "",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Unity/Generated/Icons/Vehicle/TruckT3Loose.png",
      "gridPosition": {
        "x": 152,
        "y": 5
      },
      "unlocks": [
        {
          "type": "vehicle",
          "id": "TruckT3Loose",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "vehicle",
          "id": "TruckT3Fluid",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "vehicle",
          "id": "ExcavatorT3",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchResearchLab5"
      ],
      "researchDurationMonths": 144,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchStacker",
      "name": "Stacker",
      "description": "Enables the use of stackers to efficiently manage and organize material flows, improving logistics and storage in your transport network.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Unity/Generated/Icons/LayoutEntity/Stacker.png",
      "gridPosition": {
        "x": 32,
        "y": 7
      },
      "unlocks": [
        {
          "type": "building",
          "id": "Stacker",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchRetainingWalls"
      ],
      "researchDurationMonths": 20,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchShipArmor3",
      "name": "Armor III",
      "description": "Armor III research unlocks advanced battleship armor using cutting-edge metallurgical techniques, significantly enhancing durability against enemy fire. It ensures vessels withstand intense combat and harsh seas, protecting critical maritime operations. This upgrade strengthens your fleet\u2019s resilience for prolonged naval engagements.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/World/Icons/Armor3.png",
      "gridPosition": {
        "x": 124,
        "y": 54
      },
      "unlocks": [
        {
          "type": "other",
          "id": "ArmorT3",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchShipWeapons3"
      ],
      "researchDurationMonths": 96,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchShipRadar3",
      "name": "Ship bridge IV",
      "description": "Ship Bridge IV research introduces advanced radar systems with superior electronics, improving navigation and enemy detection for battleships. It enhances tactical coordination, ensuring safer and more precise maritime operations. This upgrade is vital for commanding complex naval strategies.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/World/Icons/Bridge2.png",
      "gridPosition": {
        "x": 132,
        "y": 54
      },
      "unlocks": [
        {
          "type": "other",
          "id": "BridgeT4",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchShipArmor3",
        "ResearchAluminumSmelting"
      ],
      "researchDurationMonths": 92,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchEngine4",
      "name": "Ship engine IV",
      "description": "Ship Engine IV research delivers a high-efficiency engine through compact engineering, boosting battleship speed and maneuverability. It powers vessels for extended combat missions, enhancing fleet responsiveness. This upgrade drives faster, more reliable naval operations.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/World/Icons/Engine4.png",
      "gridPosition": {
        "x": 140,
        "y": 54
      },
      "unlocks": [
        {
          "type": "other",
          "id": "EngineT4",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchShipRadar3"
      ],
      "researchDurationMonths": 92,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchShipWeapons4",
      "name": "Ship weapons IV",
      "description": "Ship Weapons IV research equips battleships with powerful weaponry, leveraging advanced gunpowder technology for devastating combat strength. It ensures superiority in naval battles, securing critical sea routes. This upgrade bolsters your fleet\u2019s offensive capabilities.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/World/Icons/Gun4.png",
      "gridPosition": {
        "x": 152,
        "y": 54
      },
      "unlocks": [
        {
          "type": "other",
          "id": "Gun4",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "other",
          "id": "Gun4Rear",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchEngine4",
        "ResearchResearchLab5"
      ],
      "researchDurationMonths": 48,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchShipArmor4",
      "name": "Armor IV",
      "description": "Armor IV research provides battleships with exceptionally resilient armor through innovative alloy compositions, offering unmatched protection. It fortifies vessels against extreme combat and environmental threats, ensuring mission success. Requiring titanium advancements, this upgrade secures your fleet\u2019s dominance.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/World/Icons/Armor4.png",
      "gridPosition": {
        "x": 160,
        "y": 54
      },
      "unlocks": [
        {
          "type": "other",
          "id": "ArmorT4",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchShipWeapons4",
        "ResearchTitaniumSmelting"
      ],
      "researchDurationMonths": 72,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchShipFuelTankUpgrade2",
      "name": "Mega fuel tank",
      "description": "Mega Fuel Tank research unlocks a high-capacity fuel tank design, enabling battleships to undertake longer missions without refueling. It supports extended naval campaigns, enhancing strategic flexibility. This upgrade ensures your fleet\u2019s endurance in prolonged conflicts.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/World/Icons/FuelTank2.png",
      "gridPosition": {
        "x": 164,
        "y": 54
      },
      "unlocks": [
        {
          "type": "other",
          "id": "FuelTankT2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchShipArmor4"
      ],
      "researchDurationMonths": 72,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchEngine5",
      "name": "Ship engine V",
      "description": "Ship Engine V research integrates next-generation compact technologies for an ultra-efficient engine, maximizing battleship speed and range. It empowers top-tier vessels to outmaneuver opponents in critical naval operations. It ensures unmatched performance for your fleet\u2019s most demanding battles.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/World/Icons/Engine5.png",
      "gridPosition": {
        "x": 168,
        "y": 54
      },
      "unlocks": [
        {
          "type": "other",
          "id": "EngineT5",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchShipFuelTankUpgrade2"
      ],
      "researchDurationMonths": 96,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchShipWeapons5",
      "name": "Ship weapons V",
      "description": "Ship Weapons V research deploys state-of-the-art weaponry with refined gunpowder innovations, delivering unparalleled firepower for battleship supremacy. It secures naval dominance, protecting key maritime routes from all threats. This upgrade ensures your fleet\u2019s overwhelming combat strength.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/World/Icons/Gun5.png",
      "gridPosition": {
        "x": 172,
        "y": 54
      },
      "unlocks": [
        {
          "type": "other",
          "id": "Gun5",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "other",
          "id": "Gun5Rear",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchEngine5"
      ],
      "researchDurationMonths": 96,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchCargoShipDrydock",
      "name": "Cargo Ship Drydock",
      "description": "Cargo Ship Drydock research enables construction of dedicated cargo ships, expanding your fleet\u2019s capacity for resource transport to support naval operations. It unlocks specialized drydocks, streamlining shipbuilding for logistical efficiency. This upgrade bolsters your factory\u2019s maritime supply chain.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/World/Icons/CargoShipDryDock.png",
      "gridPosition": {
        "x": 44,
        "y": 15
      },
      "unlocks": [
        {
          "type": "machine",
          "id": "CargoShipDrydock",
          "allRecipesUnlocked": true,
          "recipeIds": [
            "CargoShipRecipe",
            "CargoShipRecipeT2"
          ]
        }
      ],
      "parentIds": [
        "ResearchCargoDepot"
      ],
      "researchDurationMonths": 8,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchShipyardT2",
      "name": "Shipyard II",
      "description": "Shipyard II research upgrades shipyards with advanced input and output ports, enhancing construction efficiency for battleships. It streamlines production, supporting rapid combat fleet expansion.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Unity/Generated/Icons/LayoutEntity/Shipyard2.png",
      "gridPosition": {
        "x": 48,
        "y": 15
      },
      "unlocks": [
        {
          "type": "building",
          "id": "ShipyardAdvanced",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchCargoDepot"
      ],
      "researchDurationMonths": 24,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchConveyorBeltsT4",
      "name": "Conveyor Belts IV",
      "description": "Introduces high-capacity conveyor systems for loose and flat materials, plus advanced molten metal channels. These cutting-edge beasts handle massive throughput, speeding up resource transport across sprawling factories.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Logistics/Transports/LooseConveyorT4.png",
      "gridPosition": {
        "x": 148,
        "y": 14
      },
      "unlocks": [
        {
          "type": "other",
          "id": "LooseMaterialConveyorT4",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "other",
          "id": "FlatConveyorT4",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "other",
          "id": "MoltenMetalChannelT2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchResearchLab5"
      ],
      "researchDurationMonths": 240,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchThroughputCounters",
      "name": "Throughput Counters",
      "description": "Unlocks specialized counters for conveyors, pipes, and molten metal channels to track material and fluid flow. These tools provide real-time data, helping you fine-tune your logistics network for peak efficiency.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Logistics/Icons/CounterFlat.png",
      "gridPosition": {
        "x": 36,
        "y": 11
      },
      "unlocks": [
        {
          "type": "building",
          "id": "Counter_IoPortShape_FlatConveyor",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "Counter_IoPortShape_LooseMaterialConveyor",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "Counter_IoPortShape_Pipe",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "Counter_IoPortShape_MoltenMetalChannel",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchConveyorRouting"
      ],
      "researchDurationMonths": 60,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchFishingDock",
      "name": "Fishery and Canning",
      "description": "This research unlocks the Basic Fishing Dock, a simple wooden platform for catching anchovies and sardines, providing an early-game food source. It also enables the Cannery, allowing fish preservation with iron cans to ensure a stable food supply. Ideal for new island settlements, it integrates with basic trade logistics.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Agriculture/Icons/FishingDock.png",
      "gridPosition": {
        "x": 8,
        "y": 25
      },
      "unlocks": [
        {
          "type": "building",
          "id": "FishingDock",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "machine",
          "id": "Cannery",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Anchovies",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "FoodCanEmpty",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "FoodCanFish",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "CannedFishFromAnchovies",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Sardines",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "FoodCanEmpty",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "FoodCanFish",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "CannedFishFromSardines",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Iron",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "FoodCanEmpty",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "EmptyCanProductionT1Iron",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchTradeDock"
      ],
      "researchDurationMonths": 4,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchFishingDock2",
      "name": "Advanced Fishery",
      "description": "Advanced Fishery research unlocks an upgraded fishing dock with conveyor belt systems for automated fish transport, targeting larger species like mackerel and cod alongside smaller fish. It enhances canning with new recipes for raw fish, fruits, and vegetables, using improved iron and steel cans. This upgrade boosts mid-game food production efficiency.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Agriculture/Icons/FishingDock2.png",
      "gridPosition": {
        "x": 52,
        "y": 23
      },
      "unlocks": [
        {
          "type": "building",
          "id": "FishingDockII",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Cod",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "RawFish",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "FishScales",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "RawFishFromCod",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Mackerel",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "RawFish",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "FishScales",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "RawFishFromMackerel",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "RawFish",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "FoodCanEmpty",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "FoodCanFish",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "CannedFishFromRawFish",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Fruit",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "FoodCanEmpty",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "FoodCanFruit",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "CannedFruitProduction",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Vegetables",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "FoodCanEmpty",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "FoodCanVegetables",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "CannedVegetablesProduction",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Iron",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "FoodCanEmpty",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "EmptyCanProductionT2Iron",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Iron",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "FoodCanEmpty",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "EmptyCanProductionT3Iron",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Steel",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "FoodCanEmpty",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "EmptyCanProductionT3Steel",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchFishingDock",
        "ResearchSteelSmelting"
      ],
      "researchDurationMonths": 24,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchFishingDock3",
      "name": "High-Tech Fishery",
      "description": "High-Tech Fishery research unlocks a cutting-edge dock that uses automation and large boats to catch premium tuna and swordfish, alongside all prior fish types. It requires fewer workers and less power, maximizing output, and supports advanced canning with aluminum and high-grade steel cans. This late-game upgrade optimizes food logistics for expansive factories.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Agriculture/Icons/FishingDock3.png",
      "gridPosition": {
        "x": 128,
        "y": 28
      },
      "unlocks": [
        {
          "type": "building",
          "id": "FishingDockIII",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Iron",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "FoodCanEmpty",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "EmptyCanProductionT4Iron",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Iron",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "FoodCanEmpty",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "EmptyCanProductionT5Iron",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Steel",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "FoodCanEmpty",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "EmptyCanProductionT4Steel",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Steel",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "FoodCanEmpty",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "EmptyCanProductionT5Steel",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Aluminum",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "FoodCanEmpty",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "EmptyCanProductionT5Aluminum",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Tuna",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "RawFish",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "FishScales",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "FishOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "RawFishFromTuna",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Swordfish",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "RawFish",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "FishScales",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "FishOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "RawFishFromSwordfish",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchFishingDock2",
        "ResearchAluminumSmelting"
      ],
      "researchDurationMonths": 48,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchOverclocking",
      "name": "Overclocking",
      "description": "Overclocking allows you to enhance the performance of machines and production lines in your factory by boosting their processing speed at the expense of higher energy consumption and wear. Strategic use of Overclocking maximizes factory output but demands precise resource allocation to avoid costly inefficiencies.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Unity/UserInterface/EntityIcons/Boost.png",
      "gridPosition": {
        "x": 44,
        "y": 7
      },
      "unlocks": [
        {
          "type": "other",
          "id": "TechnologyOverclocking",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchMaintenanceDepot"
      ],
      "researchDurationMonths": 38,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchHydrocrackingOil",
      "name": "Oil Hydrocracking",
      "description": "Oil Hydrocracking research unlocks recipes to break down heavy and medium oil into lighter fuels using hydrogen. It transforms heavy oil into medium oil and medium oil into light oil, boosting fuel production efficiency. This process streamlines your factory\u2019s ability to create versatile hydrocarbons for advanced energy needs.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "",
      "gridPosition": {
        "x": 92,
        "y": 11
      },
      "unlocks": [
        {
          "type": "product",
          "id": "Product_HeavyOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Hydrogen",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_MediumOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_FuelGas",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "HeavyOilToMediumCracking",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_MediumOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Hydrogen",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_LightOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_FuelGas",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "MediumOilToLightCracking",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchHydrogenReforming"
      ],
      "researchDurationMonths": 72,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchSynfuelRefining",
      "name": "Synfuel Refining",
      "description": "Synfuel Refining research enables the Synfuel Refinery to convert crude oil, hydrogen, and steam into high-energy synfuel liquid or gas. It produces valuable byproducts like sour water and fuel gas, supporting diverse industrial applications. This unlocks a powerful fuel source for late-game factory expansion.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Icons/SynfuelRefinery.png",
      "gridPosition": {
        "x": 148,
        "y": 47
      },
      "unlocks": [
        {
          "type": "product",
          "id": "Product_LightOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Hydrogen",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SteamSp",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "SynfuelLiquid",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_FuelGas",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SourWater",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "SynfuelLiquidRefining",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_FuelGas",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Hydrogen",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SteamSp",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "SynfuelGas",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_CarbonDioxide",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "SynfuelGasRefining",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "machine",
          "id": "SynfuelRefinery",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchResearchLab5"
      ],
      "researchDurationMonths": 192,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchSynfuelGenerator",
      "name": "Synfuel Generator",
      "description": "Synfuel Generator research unlocks generators that burn synfuel liquid to produce 12 MW of electricity with minimal exhaust. These compact machines deliver high-efficiency power, ideal for scaling up your factory\u2019s energy grid. It\u2019s a key step for robust, high-output power production.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Icons/SynfuelGenerator.png",
      "gridPosition": {
        "x": 156,
        "y": 47
      },
      "unlocks": [
        {
          "type": "building",
          "id": "SynfuelGenerator",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchResearchLab5"
      ],
      "researchDurationMonths": 240,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchHighPressureBoiler",
      "name": "High-Pressure Boiler",
      "description": "High-Pressure Boiler research unlocks advanced boilers that burn various fuels with super steam for superior steam generation. These boilers optimize heat production, powering distillation and other high-demand processes. It boosts factory efficiency with enhanced steam output for late-game operations.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Icons/HighPressureBoiler.png",
      "gridPosition": {
        "x": 164,
        "y": 35
      },
      "unlocks": [
        {
          "type": "machine",
          "id": "HighPressureBoiler",
          "allRecipesUnlocked": true,
          "recipeIds": [
            "HPSteamGenerationHeavyOil",
            "HPSteamGenerationMediumOil",
            "HPSteamGenerationLightOil",
            "HPSteamGenerationNaphtha",
            "HPSteamGenerationEthanol",
            "HPSteamGenerationFuelGas",
            "HPSteamGenerationSynfluidSuper",
            "HPSteamGenerationSyngasSuper"
          ]
        },
        {
          "type": "product",
          "id": "Product_Water",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_HeavyOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SteamSp",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Exhaust",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "HPSteamGenerationHeavyOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Water",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_MediumOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SteamSp",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Exhaust",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "HPSteamGenerationMediumOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Water",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_LightOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SteamSp",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Exhaust",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "HPSteamGenerationLightOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Water",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Naphtha",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SteamSp",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Exhaust",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "HPSteamGenerationNaphtha",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Water",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Ethanol",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SteamSp",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_CarbonDioxide",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "HPSteamGenerationEthanol",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Water",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_FuelGas",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SteamSp",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_CarbonDioxide",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "HPSteamGenerationFuelGas",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Water",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "SynfuelLiquid",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SteamSp",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_CarbonDioxide",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "HPSteamGenerationSynfluidSuper",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Water",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "SynfuelGas",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SteamSp",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_CarbonDioxide",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "HPSteamGenerationSyngasSuper",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchSuperPressSteam",
        "ResearchSynfuelRefining"
      ],
      "researchDurationMonths": 192,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchSynfuelCargoShips",
      "name": "Synfuel Cargo Ships",
      "description": "Synfuel Cargo Ships research allows cargo ships to run on synfuel, enabling cleaner and more efficient maritime transport. These ships maintain high cargo capacity while reducing emissions, streamlining global trade routes. It enhances your factory\u2019s ability to move resources across the world map.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "",
      "gridPosition": {
        "x": 156,
        "y": 51
      },
      "unlocks": [],
      "parentIds": [
        "ResearchSynfuelRefining"
      ],
      "researchDurationMonths": 292,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchSynfuelLocomotives",
      "name": "Synfuel Locomotives",
      "description": "Synfuel Locomotives research enables trains to use synfuel, powering cleaner and more efficient rail transport. These locomotives offer robust cargo capacity with reduced environmental impact, optimizing your rail network. It strengthens factory logistics with eco-friendly, high-performance trains.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Icons/LocomotiveT1SynfuelLiquidSide.png",
      "gridPosition": {
        "x": 156,
        "y": 39
      },
      "unlocks": [
        {
          "type": "other",
          "id": "LocomotiveT1SynfuelLiquid",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "TrainStationFuelSynfuel",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchSynfuelRefining"
      ],
      "researchDurationMonths": 192,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchSynfuelRockets",
      "name": "Rocket III",
      "description": "Rocket III research unlocks advanced synfuel-powered cargo rockets for high-capacity space transport. Building on prior rocket technology, these rockets deliver massive payloads with greater efficiency.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 0,
      "iconPath": "Assets/Unity/Generated/Icons/Vehicle/CargoRocketT2Transporter.png",
      "gridPosition": {
        "x": 172,
        "y": 22
      },
      "unlocks": [
        {
          "type": "vehicle",
          "id": "CargoRocketT3Transporter",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchSynfuelRefining",
        "ResearchRocket2"
      ],
      "researchDurationMonths": 172,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchCargoDepot5",
      "name": "Cargo Depot V \u0026 VI",
      "description": "This research unlocks Cargo Depot V \u0026 VI, enabling massive cargo ships that leverage synfuel for unparalleled transport capacity across the world map. These colossal vessels dramatically enhance trade efficiency, supporting fluid, loose, and unit cargo modules for a robust global supply chain. Requiring advanced research facilities, it revolutionizes late-game logistics with synfuel\u2019s high-energy potential.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Icons/CargoDepotT5.png",
      "gridPosition": {
        "x": 148,
        "y": 8
      },
      "unlocks": [
        {
          "type": "building",
          "id": "CargoDepotT5",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "CargoDepotT6",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "CargoDepotModuleFluidT4",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "CargoDepotModuleLooseT4",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "CargoDepotModuleUnitT4",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchResearchLab5"
      ],
      "researchDurationMonths": 240,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchFuelStationsT4",
      "name": "Fuel Stations IV",
      "description": "Fuel Stations IV research unlocks massive fuel stations that support diesel, hydrogen, and synfuel, catering to heavy-duty vehicles. These advanced stations maximize refueling throughput, streamlining logistics for sprawling factory operations. Built on prior vehicle capacity upgrades, they boost efficiency in your industrial transport network.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Icons/FuelStationT4.png",
      "gridPosition": {
        "x": 152,
        "y": 35
      },
      "unlocks": [
        {
          "type": "building",
          "id": "FuelStationT4",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "FuelStationHydrogenT4",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "FuelStationSynfuelT4",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchVehicleCapIncrease6"
      ],
      "researchDurationMonths": 192,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchSynfuelVehicles",
      "name": "Synfuel Vehicles",
      "description": "This research unlocks synfuel compatibility for heavy-duty vehicles like large trucks, excavators, tree harvesters, and planters, enhancing their efficiency and range. Synfuel-powered vehicles produce fewer emissions while delivering superior performance, optimizing mid-game logistics. It builds on synfuel refining technology, integrating seamlessly into your factory\u2019s transport network.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Vehicles/Legacy/LargeTruckS.png",
      "gridPosition": {
        "x": 156,
        "y": 43
      },
      "unlocks": [
        {
          "type": "vehicle",
          "id": "LargeTruckS",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "vehicle",
          "id": "LargeExcavatorS",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "vehicle",
          "id": "TreeHarvesterT2S",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "vehicle",
          "id": "TreePlanterT1S",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchSynfuelRefining"
      ],
      "researchDurationMonths": 240,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchVehicleAssembly3S",
      "name": "Synfuel mega vehicles",
      "description": "Synfuel Mega Vehicles research enables advanced trucks and excavators to utilize synfuel, boosting their capacity and efficiency for large-scale operations. These high-performance vehicles support loose and fluid cargo, streamlining massive logistics tasks. Requiring synfuel refining and mega vehicle research, this upgrade powers late-game factory expansion with reduced environmental impact.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Unity/Generated/Icons/Vehicle/TruckT3Loose.png",
      "gridPosition": {
        "x": 156,
        "y": 8
      },
      "unlocks": [
        {
          "type": "vehicle",
          "id": "TruckT3LooseS",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "vehicle",
          "id": "TruckT3FluidS",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "vehicle",
          "id": "ExcavatorT3S",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchVehicleAssembly3"
      ],
      "researchDurationMonths": 168,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchLargeVehicles",
      "name": "Large vehicles",
      "description": "Large Vehicles research unlocks a new tier of robust trucks and excavators, positioned between standard trucks and mega vehicles, enhancing logistics capacity. It enables production of advanced vehicle parts and unlocks supporting infrastructure like fuel stations and depots. This upgrade boosts factory transport efficiency, paving the way for large-scale operations.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Unity/Generated/Icons/LayoutEntity/FuelStationT3.png",
      "gridPosition": {
        "x": 116,
        "y": 4
      },
      "unlocks": [
        {
          "type": "building",
          "id": "FuelStationT3",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "building",
          "id": "VehiclesDepotT3",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "vehicle",
          "id": "LargeTruckD",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "vehicle",
          "id": "LargeExcavator",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_VehicleParts2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Electronics2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_VehicleParts3",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "VehicleParts3AssemblyT1",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_VehicleParts2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Electronics2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_VehicleParts3",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "VehicleParts3AssemblyT2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_VehicleParts2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Electronics2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_VehicleParts3",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "VehicleParts3AssemblyT3",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchResearchLab4"
      ],
      "researchDurationMonths": 144,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchLargeVehiclesH",
      "name": "Hydrogen large vehicles",
      "description": "Hydrogen Large Vehicles research enables large trucks and excavators to run on hydrogen, offering improved efficiency and reduced emissions. Building on hydrogen cell technology, these vehicles enhance transport performance for mid-to-large-scale factory logistics. This upgrade optimizes resource movement, complementing the large vehicles tier with sustainable power.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Icons/LargeExcavatorH.png",
      "gridPosition": {
        "x": 120,
        "y": 4
      },
      "unlocks": [
        {
          "type": "vehicle",
          "id": "LargeExcavatorH",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "vehicle",
          "id": "LargeTruckH",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchLargeVehicles"
      ],
      "researchDurationMonths": 168,
      "anyParentCanUnlock": false
    },
    {
      "id": "ResearchSuperDistillation",
      "name": "Super Distillation",
      "description": "Super Distillation research unlocks a chain of three advanced distillation towers and a hydrocracker, all built to process oil and titanium with super steam. These machines split crude oil into usable fuels, refine them further into diesel and naphtha, and purify titanium chloride for high-tech production.",
      "baseCost": 0,
      "tier": 0,
      "maxLevels": 1,
      "perLevelBonuses": {},
      "spacePointsRequiredFrom": 2147483647,
      "iconPath": "Assets/Icons/DistillationTowerS1T2.png",
      "gridPosition": {
        "x": 160,
        "y": 29
      },
      "unlocks": [
        {
          "type": "machine",
          "id": "DistillationTowerS1T2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_CrudeOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SteamHi",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_MediumOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_HeavyOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SourWater",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "CrudeOilRefiningT2COIE",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_CrudeOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SteamSp",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_MediumOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_HeavyOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SourWater",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "CrudeOilRefiningT2Sp",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "machine",
          "id": "DistillationTowerS2T2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_MediumOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SteamHi",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Diesel",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_LightOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "MediumOilRefiningT2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_MediumOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SteamSp",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Diesel",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_LightOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "MediumOilRefiningT2Sp",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "machine",
          "id": "DistillationTowerS3T2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_LightOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SteamHi",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Naphtha",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_FuelGas",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "LightOilRefiningT2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_LightOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SteamSp",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Naphtha",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_FuelGas",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "LightOilRefiningT2Sp",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_TitaniumChloride",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SteamHi",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_TitaniumChloridePure",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SteamDepleted",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "TitaniumPurificationT2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_TitaniumChloride",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SteamSp",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_TitaniumChloridePure",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SteamDepleted",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "TitaniumPurificationT2Sp",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "machine",
          "id": "HydroCrackerT2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_HeavyOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Hydrogen",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Diesel",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_FuelGas",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "HeavyOilCrackingT2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_HeavyOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Hydrogen",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Naphtha",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_FuelGas",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "HeavyOilCrackingToNaphthaT2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Naphtha",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Hydrogen",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Diesel",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_FuelGas",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "NaphthaReformingT2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Diesel",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SteamHi",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Naphtha",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_FuelGas",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "DieselReformingT2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Diesel",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SteamSp",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Naphtha",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_FuelGas",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "DieselReformingT2Sp",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Naphtha",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SteamHi",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_FuelGas",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Hydrogen",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "NaphthaReformingToGasT2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Naphtha",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SteamSp",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_FuelGas",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Hydrogen",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "NaphthaReformingToGasT2Sp",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_FuelGas",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Oxygen",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Diesel",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Water",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "FuelGasReformingT2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_HeavyOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Hydrogen",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_MediumOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_FuelGas",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "HeavyOilToMediumCrackingT2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_MediumOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Hydrogen",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_LightOil",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_FuelGas",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "MediumOilToLightCrackingT2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SourWater",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SteamHi",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Sulfur",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Ammonia",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Water",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "SourWaterStrippingT2",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SourWater",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_SteamSp",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Sulfur",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Ammonia",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "product",
          "id": "Product_Water",
          "allRecipesUnlocked": false,
          "recipeIds": []
        },
        {
          "type": "recipe",
          "id": "SourWaterStrippingT2Sp",
          "allRecipesUnlocked": false,
          "recipeIds": []
        }
      ],
      "parentIds": [
        "ResearchSuperPressSteam",
        "ResearchTitaniumSmelting"
      ],
      "researchDurationMonths": 256,
      "anyParentCanUnlock": false
    }
  ],
  "mods": null,
  "cropFoodChains": {},
  "foodCropIds": []
};

export default GameData;