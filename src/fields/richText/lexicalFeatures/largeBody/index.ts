import type { FeatureProvider } from '@payloadcms/richtext-lexical'

import { $setBlocksType } from '@lexical/selection'
import { $findMatchingParent } from '@lexical/utils'
import {
  FormatSectionWithEntries,
  SlashMenuOption,
  getSelectedNode,
} from '@payloadcms/richtext-lexical'
import { $getSelection, $isRangeSelection } from 'lexical'

import { LargeBodyIcon } from './Icon'
import './index.scss'
import { $createLargeBodyNode, $isLargeBodyNode, LargeBodyNode } from './nodes/LargeBodyNode'

export const LargeBodyFeature = (): FeatureProvider => {
  return {
    feature: () => ({
      floatingSelectToolbar: {
        sections: [
          FormatSectionWithEntries([
            {
              // eslint-disable-next-line @typescript-eslint/require-await
              ChildComponent: async () => LargeBodyIcon,
              isActive: ({ selection }) => {
                if ($isRangeSelection(selection)) {
                  const selectedNode = getSelectedNode(selection)
                  const largeBodyParent = $findMatchingParent(selectedNode, $isLargeBodyNode)
                  return largeBodyParent != null
                }
                return false
              },
              key: 'largeBody',
              label: `Large Body`,
              onClick: ({ editor }) => {
                //setHeading(editor, headingSize)
                editor.update(() => {
                  const selection = $getSelection()
                  if ($isRangeSelection(selection)) {
                    $setBlocksType(selection, () => $createLargeBodyNode())
                  }
                })
              },
              order: 20,
            },
          ]),
        ],
      },
      nodes: [
        {
          type: LargeBodyNode.getType(),
          node: LargeBodyNode,
        },
      ],
      props: null,
      slashMenu: {
        options: [
          {
            displayName: 'Basic',
            key: 'Basic',
            options: [
              new SlashMenuOption(`Large Body`, {
                // eslint-disable-next-line @typescript-eslint/require-await
                Icon: async () => LargeBodyIcon,
                keywords: ['largeBody'],
                onSelect: () => {
                  const selection = $getSelection()
                  if ($isRangeSelection(selection)) {
                    $setBlocksType(selection, () => $createLargeBodyNode())
                  }
                },
              }),
            ],
          },
        ],
      },
    }),
    key: 'largeBody',
  }
}
