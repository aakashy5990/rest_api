const Dataset = require('../models/dataset');

function slugify(text){
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function getDataset(req, res){
  try {
    const { slug } = req.params;
    const ownerId = req.user?._id || res.locals.user?._id || null;
    const query = ownerId ? { slug, owner: ownerId } : { slug };
    const doc = await Dataset.findOne(query);
    if(!doc) return res.status(404).json({ error: 'Not found' });
    return res.json(doc.data);
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
}

// New builder endpoints
async function renderAddBuilder(req, res){
  return res.render('users/adddata', { title: 'Add Data' });
}

async function createDatasetFromBuilder(req, res){
  try {
    const { title, dataEntries } = req.body;
    if(!title || !dataEntries){
      return res.status(400).render('users/adddata', { title: 'Add Data', error: 'Title and data entries are required' });
    }
    
    let parsedEntries;
    try { 
      parsedEntries = JSON.parse(dataEntries); 
    } catch(err){
      return res.status(400).render('users/adddata', { title: 'Add Data', error: 'Invalid data entries payload' });
    }
    
    // Process entries and handle file uploads
    const dataArray = [];
    
    for(let entryIndex = 0; entryIndex < parsedEntries.length; entryIndex++) {
      const entryData = parsedEntries[entryIndex];
      const processedEntry = {};
      
      for(const [fieldName, fieldValue] of Object.entries(entryData)) {
        if(typeof fieldValue === 'string' && fieldValue.startsWith('__FILE_')) {
          // Handle file upload
          const filePattern = `entry_${entryIndex}_field_`;
          const matchingFile = (req.files || []).find(file => 
            file.fieldname.startsWith(filePattern) && 
            file.fieldname.includes(`_${entryIndex}_field_`)
          );
          
          if(matchingFile) {
            processedEntry[fieldName] = `/uploads/${matchingFile.filename}`;
          } else {
            processedEntry[fieldName] = null;
          }
        } else {
          processedEntry[fieldName] = fieldValue;
        }
      }
      
      dataArray.push(processedEntry);
    }
    
    let base = slugify(title) || 'dataset';
    let candidate = base;
    let i = 1;
    while(await Dataset.findOne({ slug: candidate })){
      candidate = `${base}-${i++}`;
    }
    const ownerId = req.user?._id || res.locals.user?._id || null;
    const doc = await Dataset.create({ title, slug: candidate, data: dataArray, owner: ownerId });
    const link = `/api/data/${doc.slug}`;
    return res.render('users/adddata', { title: 'Add Data', success: `Dataset created with ${dataArray.length} entries`, link });
  } catch (err) {
    console.error('Create builder dataset error', err);
    return res.status(500).render('users/adddata', { title: 'Add Data', error: 'Server error' });
  }
}

module.exports.renderAddBuilder = renderAddBuilder;
module.exports.createDatasetFromBuilder = createDatasetFromBuilder;
module.exports.getDataset = getDataset;

// List current user's datasets
async function listMyDatasets(req, res){
  try {
    const ownerId = req.user?._id;
    const items = await Dataset.find({ owner: ownerId }).sort({ createdAt: -1 }).select('title slug createdAt');
    return res.render('users/mydatasets', { title: 'My Data', items });
  } catch (err) {
    return res.status(500).render('users/mydatasets', { title: 'My Data', items: [], error: 'Server error' });
  }
}

// Update dataset title (owner-scoped)
async function updateMyDataset(req, res){
  try {
    const ownerId = req.user?._id;
    const { id, title } = req.body;
    if(!id || !title) return res.status(400).json({ error: 'id and title required' });
    const doc = await Dataset.findOneAndUpdate({ _id: id, owner: ownerId }, { title }, { new: true });
    if(!doc) return res.status(404).json({ error: 'Not found' });
    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
}

// Delete dataset (owner-scoped)
async function deleteMyDataset(req, res){
  try {
    const ownerId = req.user?._id;
    const { id } = req.body;
    if(!id) return res.status(400).json({ error: 'id required' });
    const out = await Dataset.deleteOne({ _id: id, owner: ownerId });
    if(out.deletedCount === 0) return res.status(404).json({ error: 'Not found' });
    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports.listMyDatasets = listMyDatasets;
module.exports.updateMyDataset = updateMyDataset;
module.exports.deleteMyDataset = deleteMyDataset;


// Update dataset data (owner-scoped)
async function updateMyDatasetData(req, res){
  try {
    const ownerId = req.user?._id;
    const { id, data } = req.body;
    if(!id || !data) return res.status(400).json({ error: 'id and data required' });
    let parsed;
    try { parsed = JSON.parse(data); } catch (_) { return res.status(400).json({ error: 'Invalid JSON' }); }
    const doc = await Dataset.findOneAndUpdate({ _id: id, owner: ownerId }, { data: parsed }, { new: true });
    if(!doc) return res.status(404).json({ error: 'Not found' });
    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports.updateMyDatasetData = updateMyDatasetData;


