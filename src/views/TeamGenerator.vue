<template>
  <div class="container pt-4">
    <div class="row">
      <div class="col-12">
        <h2>Team Generator</h2><hr>
        <!-- option -->
        <div class="card mb-4">
          <div class="card-header">Option</div>
          <div class="card-body">
            <form action="">
              <div class="form-group">
                <label>Split Data Source With ?</label>
                <div class="form-check my-2">
                  <input class="form-check-input" type="radio" id="r1" name="inputsplitwith" value="delimiter" v-model="option.splitWith">
                  <label class="form-check-label" for="r1">
                    Delimiter
                  </label>
                  <div style="width: 120px;">
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="option.splitWithDelimiter.delimiter">
                      <option value="1">, (koma)</option>
                      <option value="2">. (titik)</option>
                      <option value="3"> (spasi)</option>
                    </select>
                  </div>
                </div>
                <div class="form-check my-2">
                  <input class="form-check-input" type="radio" id="r2" name="inputsplitwith" value="regex" v-model="option.splitWith">
                  <label class="form-check-label" for="r2">
                    Regex Pattern
                  </label>
                  <div style="width: 120px;">
                    <input type="text" class="form-select form-select-sm" v-model="option.splitWithRegex.regex">
                  </div>
                </div>
              </div>
              <hr>
              <div class="form-group">
                <label>Hasil yang diinginakan</label>
                <div class="form-check my-2">
                  <input class="form-check-input" type="radio" id="r3" name="inputgenerateby" value="numberofteams" v-model="option.generateBy">
                  <label class="form-check-label" for="r3">
                    Hasil Tim/Grup akan berjumlah :
                  </label>
                  <div style="width: 120px;">
                    <input type="number" class="form-control form-control-sm" min="2" max="1000" v-model="option.generateByNumberOfTeams.number">
                  </div>
                </div>
                <div class="form-check my-2">
                  <input class="form-check-input" type="radio" id="r4" name="inputgenerateby" value="nameeveryteam" v-model="option.generateBy">
                  <label class="form-check-label" for="r4">
                    Hasil Tim/Grup harus berisi anggota yang berjumlah :
                  </label>
                  <div style="width: 120px;">
                    <input type="number" class="form-control form-control-sm" min="2" max="1000" v-model="option.generateByNameEveryTeam.number">
                  </div>
                </div>
              </div>
              <hr>
              <div class="form-group">
                <label>Filter Data :</label>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="c1" v-model="option.filter.filterDuplicateName">
                  <label class="form-check-label" for="c1">
                    Otomatis Deteksi Duplikat Data dan menghapusnya
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="c2" v-model="option.filter.random">
                  <label class="form-check-label" for="c2">
                    Acak Hasil Data
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
        <!-- data source -->
        <div class="card mb-4">
          <div class="card-header">Data Source</div>
          <div class="card-body">
            <textarea class="form-control" rows="10" placeholder="Data source..." v-model="source"></textarea>
          </div>
        </div>
        <!-- result -->
        <div class="card mb-4">
          <div class="card-header">
            Result
            <div class="float-end">
              <button class="btn btn-primary btn-sm" @click="getResult">
                Mulai Generate
              </button>
            </div>
          </div>
          <div class="card-body">
            <div v-if="generateResult.length > 0" class="alert alert-primary" role="alert">
              {{ resultLog.totalData }} Total Name,
              {{ resultLog.generateResult.length }} Groups Generate,
              {{ resultLog.duplicateCount }} Duplicate Name Found.
              {{ resultLog.duplicateRemovedCount }} Duplicate Name Removed.
            </div>
            <div class="text-center" v-if="generateResult.length == 0">
              Tidak ada hasil.
            </div>
            <table v-else v-for="(group, i) in generateResult" :key="i" class="table table-bordered mb-4">
              <tr>
                <th colspan="2">Team {{ i+1  }}</th>
              </tr>
              <tr v-for="(item, j) in group" :key="j">
                <td width="3%">{{ j+1 }}</td>
                <td>{{ (item) }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
export default {
  setup () {
    const option = reactive({
      splitWith: 'delimiter',
      splitWithDelimiter: {
        delimiter: 1
      },
      splitWithRegex: {
        regex: '\\r?\\n'
      },

      generateBy: 'numberofteams',
      generateByNumberOfTeams: {
        number: 3
      },
      generateByNameEveryTeam: {
        number: 3
      },

      filter: {
        random: true,
        filterDuplicateName: true
      }
    })
    const source = ref('Mangga, Jeruk, Melon')
    const { generateGenerateByNumberOfTeams } = useOurGenerateByNumberOfTeams(source, option)
    let generateResult = ref([])
    let resultLog = ref({})

    const getResult = () => {
      const { result, totalData, duplicateCount, duplicateRemovedCount } = generateGenerateByNumberOfTeams()
      resultLog.value = {
        totalData,
        generateResult: result,
        duplicateCount,
        duplicateRemovedCount
      }
      generateResult.value = result
    }

    return {
      option,
      source,
      getResult,
      generateResult,
      resultLog
    }
  }
}

function useOurGenerateByNumberOfTeams (data, option) {
  let preparedResult
  let source
  let totalData = ref(0)
  let duplicateCount = ref(0)
  let duplicateRemovedCount = ref(0)
  const prepare = () => {
    preparedResult = reactive(prepareBeforeGenerate(data, option))
    source = preparedResult.value
    duplicateCount.value = preparedResult.duplicate
    duplicateRemovedCount.value = preparedResult.duplicateRemoved
    totalData.value = source.length
  }
  const generateGenerateByNumberOfTeams = () => {
    prepare()
    const teamsCount = option.generateByNumberOfTeams.number
    let result = []
    let perTeam = source.length / teamsCount
    let currTeam = -1
    // validation
    if (source.length < teamsCount) {
      alert('Number Group Generate to many!')
      return []
    }
    // lets go
    for (let index = 0; index < source.length; index++) {
      if (index % perTeam < 1) {
        currTeam++
        result.push([])
      }
      result[currTeam].push(source[index])
    }
    return {
      result, totalData, duplicateCount, duplicateRemovedCount
    }
  }

  return { generateGenerateByNumberOfTeams }
}

function prepareBeforeGenerate (data, option) {
  const source = data.value
  // convert to array with split type
  let sourceArr = []
  if (option.splitWith == 'delimiter') {
    const delimiter = (option.splitWithDelimiter.delimiter == 1 ? ',' : (option.splitWithDelimiter.delimiter == 2 ? '.' : ' '))
    sourceArr = source.toLowerCase().split(delimiter)
  } else if (option.splitWith == 'regex') {
    let reg = new RegExp(option.splitWithRegex.regex, "g")
    sourceArr = source.toLowerCase().split(reg)
  }
  let result = {
    value: [...sourceArr],
    duplicate: 0,
    duplicateRemoved: 0
  }
  // random name ?
  let tempRand = result.value
  if (option.filter.random) {
    var currentIndex = tempRand.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = tempRand[currentIndex];
      tempRand[currentIndex] = tempRand[randomIndex];
      tempRand[randomIndex] = temporaryValue;
    }
  }
  // find duplicate name
  let tempSearch = []
  result.value.forEach((val) => {
    if (tempSearch.indexOf(val) === -1) {
      tempSearch.push(val)
    } else {
      result.duplicate++
    }
  })
  // remove duplicate name
  if (option.filter.filterDuplicateName) {
    result.value = Array.from(new Set(result.value))
    result.duplicateRemoved = sourceArr .length - result.value.length
  }
  // remove spacing in before alphabet
  if(result.value.length > 0) result.value.forEach((e, i) => result.value[i] = result.value[i].trim())
  // capitalize each word
  if(result.value.length > 0) result.value.forEach((e, i) => result.value[i] = capitalizeEachWord(result.value[i]))
  return result
}

const capitalizeEachWord = (str) => str.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
</script>