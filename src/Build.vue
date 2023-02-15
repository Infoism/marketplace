<script lang="ts" setup>
import { TBox, TText, TSpacer } from '@temir/core'
import { useLoadConfig } from './services/useLoadConfig'
import { PACKAGE_EMOJI, packageTypes, packageTypesUnion, STATUS_COLOR } from './constant'
import { computed } from 'vue';
const { packages } = useLoadConfig()
const packagesArr = computed(() => {
  return Object.values(packages).sort(pkg => ((pkg.name) as unknown as number))
})
</script>

<template>
  <TBox align-items="flex-start" flex-direction="column" justify-content="center">
    <TBox border-style="double" border-color="greenBright" justify-content="center" align-items="center">
      <TText color="white">
        👋 Building Start !!
      </TText>
    </TBox>
    <TBox>
      <TBox flex-direction="column" min-width="15">
        <TBox v-for="pkg in packagesArr">
          <TBox v-for="pType in packageTypes" :color="STATUS_COLOR[pkg.status]">
            <TText v-if="pkg?.config?.[pType]">
              {{ PACKAGE_EMOJI?.[(pType) as packageTypesUnion || 'default']}}
            </TText>
          </TBox>
          <TSpacer />
          <TText :color="STATUS_COLOR[pkg.status]">
            {{ pkg.name }}
          </TText>
          <TSpacer />
          <TText :color="STATUS_COLOR[pkg.status]">
            {{ pkg.status }}
          </TText>
        </TBox>
      </TBox>
      <TBox width="1"></TBox>
      <TBox flex-direction="column" min-width="15">
        <TBox v-for="pkg in packagesArr">
          <TText :color="STATUS_COLOR[pkg.status]">{{
            pkg.status === 'success' ? '✓' :
              pkg.status === 'error' ? '×' : '.'
          }}</TText>
          <TBox width="4"></TBox>
          <TText :color="STATUS_COLOR[pkg.status]">
            {{ pkg.message || '.' }}
          </TText>
        </TBox>
      </TBox>
    </TBox>
  </TBox>
</template>
