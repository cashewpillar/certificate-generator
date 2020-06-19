# Generated by Django 3.0.6 on 2020-06-17 09:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('learning_api', '0005_auto_20200617_1208'),
    ]

    operations = [
        migrations.RenameField(
            model_name='certificate',
            old_name='csv_names',
            new_name='names_csv',
        ),
        migrations.RemoveField(
            model_name='certificate',
            name='sample',
        ),
        migrations.AddField(
            model_name='certificate',
            name='names_file',
            field=models.FileField(blank=True, null=True, upload_to='names_files'),
        ),
        migrations.AddField(
            model_name='certificate',
            name='template_img',
            field=models.ImageField(blank=True, null=True, upload_to='certificate_templates'),
        ),
        migrations.AddField(
            model_name='certificate',
            name='template_url',
            field=models.URLField(default=''),
        ),
    ]